const Client = require("../models/tableClients");



const createClient = async (req, res) => {
  const client = req.body;
  const ganancia = client.precio - client.costo - client.envio;
  client.ganancia = ganancia;
  const newClient = new Client(client);
  try {
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
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
}

const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
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
}

const editClient = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const client = await Client.findById(id);
  if (!client) return res.status(204).json();

  Object.keys(body).forEach((key) => {
    client[key] = body[key];
  });
  await client.save();
  res.send(client);
};

const deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    await Client.findByIdAndDelete(id);
    res.status(200).json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateEstadoPedido = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const user = await Client.findById(id);
  if (!user) return res.status(204).json();

  user.estadoPedido.push({estado: estado});
  await user.save();

  res.send(user);
}

const addStateDefault = async (req, res) => {
  const clients = await Client.find();
  clients.forEach((client) => {
    client.estadoPedido.push({estado: "Confirmado"});
    client.save();
  });
  res.send(clients);
}

module.exports = {
  createClient,
  getClients,
  editClient,
  deleteClient,
  crearClientesExistentes,
  editGananciasAll,
  updateEstadoPedido,
  addStateDefault,
  getOneClient
};
