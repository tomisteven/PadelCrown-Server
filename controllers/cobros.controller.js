const ClienteFinanciero = require("../models/clienteFinanciero.js");
const Interes = require("../models/modeloInteres.js");
const nodemailer = require("nodemailer");
const fs = require("fs");

const RegistrarNuevoCliente = async (req, res) => {
  const client = req.body;

  const fecha = new Date();
  client.fechaCreacion = `${fecha.getDate()}/${
    fecha.getMonth() + 1
  }/${fecha.getFullYear()}`;

  if (await validarRepetidos(client)) {
    const newCliente = new ClienteFinanciero(client);
    try {
      await newCliente.save();
      res.status(201).json(newCliente);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(400).json({ message: "El usuario ya existe" });
  }
};

const getIntereses = async (req, res) => {
  try {
    const intereses = await Interes.find();
    res.json(intereses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const crearNuevoPago = async (req, res) => {
  const { id_cliente, id_cuota } = req.params;

  //console.log(id_cliente, id_cuota);

  const cliente = await ClienteFinanciero.findById(id_cliente);

  if (!cliente) {
    return res.status(400).json({ message: "Cliente no encontrado" });
  }

  const cuota = cliente.cuotasAPagar.find((i) => i._id == id_cuota);

  if (!cuota) {
    return res.status(400).json({ message: "Cuota no encontrada" });
  }

  if (!cuota.pagada) {
    cuota.pagada = true;
    cuota.confirmacion = "Pendiente";
    const cuotaPAGA = cuota.cuota;
    const precio = cuota.valor;
    cliente.pagos.push({ cuota: cuotaPAGA, monto: precio, fecha: new Date() });
    await cliente.save().then(() => {
      sendEmail(cliente, cuotaPAGA, precio);
    });
  } else {
    return res.status(400).json({ message: "Cuota ya pagada" });
  }

  return res.json({
    cliente,
    ok: true,
    aclaracion:
      "La cuota aparece temporalmente como pagada hasta que un administrador corrobore el ingreso del dinero, de lo contrario se anulara el pago y la cuota quedara en pendiente nuevamente",
  });
};

const getClienteFinancieroID = async (req, res) => {
  const { id } = req.params;

  const client = await ClienteFinanciero.findById(id);
  res.json(client);
};

const crearNuevaFinanciacion = async (req, res) => {
  const { precio, producto, confirmacion, tipo } = req.body;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Falta el ID del cliente" });
  }

  const cliente = await ClienteFinanciero.findById(id);

  if (!cliente) {
    return res.status(400).json({ message: "Cliente no encontrado" });
  }

  const intereses = await Interes.find();

  const arrayCuotas = (precio, cuotas, interes) => {
    const arr = [];
    for (let i = 1; i <= cuotas; i++) {
      arr.push({
        cuota: i,
        valor: Math.round(
          precio / cuotas + (precio / cuotas) * interes.interes
        ),
      });
    }
    return arr;
  };

  const opciones = [
    {
      tipo: "Semanal",
      producto: producto,
      interes: intereses[0].interes,
      cuotas: arrayCuotas(precio, 4, intereses[0]),
    },
    {
      tipo: "Quincenal",
      producto: producto,
      interes: intereses[1].interes,
      cuotas: arrayCuotas(precio, 3, intereses[1]),
    },
    {
      tipo: "Mensual",
      producto: producto,
      interes: intereses[2].interes,
      cuotas: arrayCuotas(precio, 2, intereses[2]),
    },
  ];

  if (confirmacion) {
    cliente.producto = producto + " " + precio;
    switch (tipo) {
      case "Semanal":
        cliente.cuotas = 4;
        break;
      case "Quincenal":
        cliente.cuotas = 3;
        break;
      case "Mensual":
        cliente.cuotas = 2;
        break;
      default:
        break;
    }
    // Seleccionar la opción de financiación según el tipo seleccionado por el cliente (semanal, quincenal, mensual)
    const opcionSeleccionada = opciones.find((opcion) => opcion.tipo === tipo);
    // Validar que el tipo de financiación seleccionado sea válido
    if (!opcionSeleccionada) {
      return res
        .status(400)
        .json({ message: "Tipo de financiación no válido" });
    }

    // Validar que el cliente no tenga una financiación activa
    if (cliente.financiacion.length == 1) {
      return res
        .status(400)
        .json({ message: "Ya tiene una financiación activa" });
    }

    // Agregar la financiación al cliente y las cuotas a pagar

    let crearDia = () => {
      let dia = 0;
      if (opcionSeleccionada.tipo === "Semanal") {
        dia = 7;
      } else if (opcionSeleccionada.tipo === "Quincenal") {
        dia = 15;
      } else if (opcionSeleccionada.tipo === "Mensual") {
        dia = 30;
      }
      return dia;
    };

    cliente.financiacion.push(opcionSeleccionada);
    opcionSeleccionada.cuotas.map((i, n) => {
      cliente.cuotasAPagar.push({
        cuota: i.cuota,
        valor: i.valor,
        pagada: false,
        fechaPago: crearDia() * (n + 1),
      });

      console.log(i);
    });

    // Marcar al cliente como pagando
    cliente.pagando = true;

    await cliente.save();
    return res.json({ cliente, ok: true });
  } else {
    return res.json(opciones);
  }
};

const validarRepetidos = async (client) => {
  const cliente = await ClienteFinanciero.findOne({
    userName: client.userName,
  });
  if (cliente) {
    return false;
  } else {
    return true;
  }
};

const sendEmail = async (cliente, cuotaPAGA, precio) => {
  try {
    // Leer el contenido del archivo HTML
    const html = fs.readFileSync("./cuotaPagada.html", "utf8");

    // Reemplazar los marcadores de posición en el HTML con los valores del cliente
    const replacedHTML = html
      .replace("{{ cliente.nombre }}", cliente.nombre)
      .replace("{{ cliente.dni }}", cliente.dni)
      .replace("{{ cliente.producto }}", cliente.producto)
      .replace("{{ cliente.cuota }}", cuotaPAGA)
      .replace("{{ cliente.cuotasTotales }}", cliente.cuotas)
      .replace("{{ cliente.precio }}", precio)
      .replace("{{ cliente.direccion }}", cliente.direccion)
      .replace("{{ cliente.provincia }}", cliente.provincia);

    // Configurar el transporte de nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail" || "Gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "padelcrown@gmail.com",
        pass: process.env.PASS_GMAIL,
      },
    });

    // Definir el contenido del correo electrónico
    let mailOptions = {
      from: "padelcrown@gmail.com",
      to: `${cliente.email}, padelcrown@gmail.com`,
      subject: cliente.dni + " PAGO DE CUOTA EN FINANCIERA",
      html: replacedHTML,
    };

    // Enviar el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        // Aquí no tienes acceso a `res` para responder con el estado HTTP, tendrías que manejar este caso de error de otra manera
      } else {
        console.log("Correo electrónico enviado: " + info.response);
        // Aquí tampoco tienes acceso a `res` para responder con el estado HTTP
      }
    });
  } catch (error) {
    console.log(error);
    // Manejar el error si falla la lectura del archivo HTML
  }
};

module.exports = {
  getClienteFinancieroID,
  crearNuevoPago,
  getIntereses,
  crearNuevaFinanciacion,
  RegistrarNuevoCliente,
};
