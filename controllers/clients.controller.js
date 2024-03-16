const Client = require("../models/tableClients");
const Eliminado = require("../models/eliminados");
const TimeAgo = require("javascript-time-ago/locale/es");
const nodemailer = require("nodemailer");
const fs = require("fs");

const createClient = async (req, res) => {
  console.log(req.body);
  const client = req.body;
  const email = client.email;
  const ganancia =
    client.precio - client.costo - client.envio - client.valorCarbono;
  client.ganancia = ganancia;

  const newClient = new Client(client);

  email && sendEmail(client);

  try {
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const sendEmail = async (cliente) => {
  try {
    // Leer el contenido del archivo HTML
    const html = fs.readFileSync("./email.html", "utf8");

    // Reemplazar los marcadores de posición en el HTML con los valores del cliente
    const replacedHTML = html
      .replace("{{ cliente.nombre }}", cliente.nombre)
      .replace("{{ cliente.fechaCompra }}", cliente.fechaCompra)
      .replace("{{ cliente.dni2 }}", cliente.dni)
      .replace("{{ cliente.dni }}", cliente.dni)
      .replace("{{ cliente.producto }}", cliente.producto)
      .replace("{{ cliente.precio }}", cliente.precio)
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
      to: cliente.email,
      subject: "Compra realizada en Padel Crown",
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

const addStateEliminado = async (req, res) => {
  const clientes = await Client.find();
  clientes.forEach((cliente) => {
    cliente.eliminado = false;
    cliente.save();
  });
  res.send(clientes);
};

const crearClientesExistentes = async (req, res) => {
  try {
    await Client.insertMany(clientesAnteriores);
    res.status(201).json({ message: "Clientes creados correctamente" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const editGananciasAll = async (req, res) => {
  const clients = await Client.find();
  clients.forEach((client) => {
    const ganancia = client.precio - client.costo - client.envio;
    client.ganancia = ganancia;
    client.save();
  });
  res.send(clients);
};

const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    const clientsThatAreNotDeleted = clients.filter(
      (client) => client.eliminado === false
    );
    res.status(200).json(clientsThatAreNotDeleted);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getOneClient = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Client.findById(id);
    res.status(200).json(client);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const restoreClient = async (req, res) => {
  const { id } = req.params;
  const client = await Client.findById(id);
  if (!client) return res.status(204).json();

  client.eliminado = false;
  await client.save();
  res.status(200).json({ message: "Cliente restaurado correctamente" });
};

const deleteClientPermanently = async (req, res) => {
  const { id } = req.params;
  try {
    await Client.findByIdAndDelete(id);
    res.status(200).json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteAllClientPermanently = async (req, res) => {
  try {
    const clients = await Client.find();
    const clientsThatDeleted = clients.filter(
      (client) => client.eliminado === true
    );

    if (clientsThatDeleted.length === 0) {
      return res.status(204).json({ message: "No hay clientes para eliminar" });
    } else {
      clientsThatDeleted.forEach(async (client) => {
        await Client.findByIdAndDelete(client._id);
      });

      res.status(200).json({ message: "Clientes eliminados correctamente" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const editClient = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const client = await Client.findById(id);
  if (!client) return res.status(204).json();

  Object.keys(body).forEach((key) => {
    client[key] = body[key];
  });

  client.ganancia =
    client.precio - client.costo - client.envio - client.valorCarbono;

  await client.save();
  res.send(client);
};

const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findById(id);
    client.eliminado = true;
    await client.save();
    res.status(200).json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getClientsEliminados = async (req, res) => {
  try {
    const clients = await Client.find();
    const clientsThatAreDeleted = clients.filter(
      (client) => client.eliminado === true
    );
    res.status(200).json(clientsThatAreDeleted);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateEstadoPedido = async (req, res) => {
  const { id } = req.params;
  const { estado, fecha } = req.body;
  const user = await Client.findById(id);
  if (!user) return res.status(204).json();

  user.estado = estado;
  console.log({ estado: estado, fecha: fecha });
  user.estadoPedido.push({ estado: estado, fecha: fecha });
  await user.save();
  console.log(user.estadoPedido);
  res.json(user);
};

const addStateDefault = async (req, res) => {
  const clients = await Client.find();
  clients.forEach((client) => {
    client.estadoPedido.push({ estado: "Confirmado" });
    client.save();
  });
  res.send(clients);
};

const addComentario = async (req, res) => {
  const { id } = req.params;
  const { comentario } = req.body;
  const clients = await Client.findById(id);
  if (!clients) return res.status(204).json();

  clients.comentarios.push({ comentario: comentario });
  await clients.save();

  res.json(clients);
};

const addComentarioAll = async (req, res) => {
  const clients = await Client.find();
  clients.forEach((client) => {
    client.comentarios.push({ comentario: "Sin comentarios" });
    client.save();
  });
  res.send(clients);
};

const deleteLinkSeguimiento = async (req, res) => {
  const { id } = req.params;
  const { link } = req.body;
  const clients = await Client.findById(id);
  if (!clients) return res.status(204).json();

  clients.linkSeguimiento = "";
  await clients.save();

  res.json({ message: "Link eliminado correctamente" });
};

module.exports = {
  createClient,
  getClients,
  editClient,
  deleteClient,
  crearClientesExistentes,
  editGananciasAll,
  updateEstadoPedido,
  addStateDefault,
  getOneClient,
  addComentario,
  addComentarioAll,
  deleteLinkSeguimiento,
  getClientsEliminados,
  addStateEliminado,
  restoreClient,
  deleteClientPermanently,
  deleteAllClientPermanently,
};
