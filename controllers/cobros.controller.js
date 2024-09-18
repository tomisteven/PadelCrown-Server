const ClienteFinanciero = require("../models/clienteFinanciero.js");
const Interes = require("../models/modeloInteres.js");
const nodemailer = require("nodemailer");
const fs = require("fs");
const { log } = require("console");
const object = require("@hapi/joi/lib/types/object.js");

const loginCliente = async (req, res) => {
  const { username, password } = req.body;

  const cliente = await ClienteFinanciero.findOne({
    username: username,
    password: password,
  });

  if (cliente) {
    res.json(cliente);
  } else {
    res
      .status(400)
      .json({ message: "Usuario o contraseña incorrectos", ok: false });
  }
};

const RegistrarNuevoCliente = async (req, res) => {
  const client = req.body;

  const fecha = new Date();
  client.fechaCreacion = `${fecha.getDate()}/${
    fecha.getMonth() + 1
  }/${fecha.getFullYear()}`;

  const clienteExiste = await ClienteFinanciero.findOne({
    username: client.username,
  });

  client.confirmadoPorAdministracion = false;

  if (clienteExiste === null) {
    const newCliente = new ClienteFinanciero(client);
    try {
      await newCliente.save();
      res.json(newCliente);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(400).json({ message: "El usuario ya existe" });
  }
};

const eliminarCliente = async (req, res) => {
  const { id } = req.params;
  const cliente = await ClienteFinanciero.findById(id);

  if (!cliente) {
    return res.status(400).json({ message: "Cliente no encontrado" });
  }

  await ClienteFinanciero.findByIdAndDelete(id);
  res.json({ message: "Cliente eliminado" });
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
  const { producto } = req.body;

  //console.log(id_cliente, id_cuota);

  const cliente = await ClienteFinanciero.findById(id_cliente);

  if (!cliente) {
    return res.status(400).json({ message: "Cliente no encontrado" });
  }

  const cuota = cliente.cuotasAPagar.find((i) => i._id == id_cuota);

  if (!cuota || !producto) {
    return res.status(400).json({
      message:
        "Cuota no encontrada o producto sin especificar, revise nuevamente",
    });
  }

  if (!cuota.pagada) {
    //cuota.pagada = true;
    cuota.confirmacion = "Pendiente";

    const precio = cuota.valor;
     cliente.pagos.push({
      cuota: cuota.cuota,
      monto: precio,
      fecha: new Date(),
    });
    /* cliente.historial.push({
      cuota: cuota.cuota,
      monto: precio,
      fecha: new Date(),
      producto: producto,
    });  */
    cuota.estado = "Pendiente de Aprobación";
    await cliente.save().then(() => {
      sendEmail(cliente, cuota.cuota, precio);
    });
  } else {
    return res.status(400).json({ message: "Cuota ya pagada", ok: false });
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

const crearNuevaFinanciacion2 = async (req, res) => {
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

  function calcularFechas(tipo) {
    let intervaloDias = 0;
    let cantidadDePeriodos = 0;
    if (tipo === "Semanal") {
      intervaloDias = 7;
      cantidadDePeriodos = 4;
    } else if (tipo === "Quincenal") {
      intervaloDias = 15;
      cantidadDePeriodos = 3;
    } else if (tipo === "Mensual") {
      intervaloDias = 30;
      cantidadDePeriodos = 2;
    }

    const fechas = [];
    const hoy = new Date();

    for (let i = 0; i < cantidadDePeriodos; i++) {
      const nuevaFecha = new Date(hoy);
      nuevaFecha.setDate(hoy.getDate() + i * intervaloDias);
      fechas.push(nuevaFecha.toLocaleDateString());
    }

    //console.log(fechas);
    return fechas;
  }

  const arrayCuotas = (precio, cuotas, interes, tipo) => {
    const arr = [];
    for (let i = 1; i <= cuotas; i++) {
      arr.push({
        cuota: i,
        valor: Math.round(
          precio / cuotas + (precio / cuotas) * interes.interes
        ),
        fechaPago: calcularFechas(tipo)[i - 1],
      });
    }
    return arr;
  };

  const opciones = [
    {
      tipo: "Semanal",
      producto: producto,
      interes: intereses[0].interes,
      cuotas: arrayCuotas(precio, 4, intereses[0], "Semanal"),
    },
    {
      tipo: "Quincenal",
      producto: producto,
      interes: intereses[1].interes,
      cuotas: arrayCuotas(precio, 3, intereses[1], "Quincenal"),
    },
    {
      tipo: "Mensual",
      producto: producto,
      interes: intereses[2].interes,
      cuotas: arrayCuotas(precio, 2, intereses[2], "Mensual"),
    },
  ];

  if (confirmacion) {
    cliente.producto = producto + " " + precio;
    cliente.tipoPago = tipo;
    cliente.estadoActual = true;
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

    cliente.financiacion.push(opcionSeleccionada);
    opcionSeleccionada.cuotas.map((i, n) => {
      cliente.cuotasAPagar.push({
        cuota: i.cuota,
        valor: i.valor,
        pagada: false,
        fechaPago: calcularFechas(tipo)[i.cuota - 1],
      });
    });

    // Marcar al cliente como pagando
    cliente.pagando = true;

    await cliente.save();
    return res.json({ cliente, ok: true });
  } else {
    return res.json(opciones);
  }
};

const eliminarFinanciacion = async (req, res) => {
  const { id } = req.params;

  const cliente = await ClienteFinanciero.findById(id);

  if (!cliente) {
    return res.status(400).json({ message: "Cliente no encontrado" });
  }

  cliente.financiacion = [];
  cliente.cuotasAPagar = [];
  cliente.pagando = false;
  cliente.pagos = [];

  await cliente.save();
  res.json({ cliente, ok: true });
};

const validarRepetidos = async (client) => {
  const cliente = await ClienteFinanciero.findOne({
    username: client.username,
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

const editarCliente = async (req, res) => {
  const { id } = req.params;

  const cliente = await ClienteFinanciero.findById(id);

  if (!cliente) {
    return res.status(400).json({ message: "Cliente no encontrado" });
  }

  /* console.log(req.body);
  console.log(cliente); */

  Object.keys(req.body).forEach((key) => {
    cliente[key] = req.body[key];
  });

  await cliente.save();

  res.json({ cliente, ok: true });
};

module.exports = {
  getClienteFinancieroID,
  crearNuevoPago,
  getIntereses,
  crearNuevaFinanciacion,
  crearNuevaFinanciacion2,
  RegistrarNuevoCliente,
  eliminarCliente,
  eliminarFinanciacion,
  loginCliente,
  editarCliente,
};
