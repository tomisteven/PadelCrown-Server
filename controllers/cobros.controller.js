const ClienteFinanciero = require("../models/clienteFinanciero.js");

const getClientesFinancieros = async (req, res) => {
  try {
    const clientesFinancieros = await ClienteFinanciero.find();
    res.json(clientesFinancieros);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createClienteFinanciero = async (req, res) => {
  const client = req.body;

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

const getClienteFinancieroID = async (req, res) => {
  const { id } = req.params;

  const client = await ClienteFinanciero.findById(id);
  res.json(client);
};

//Funcion para validar si el usuario ya existe
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
module.exports = {
  getClientesFinancieros,
  createClienteFinanciero,
  getClienteFinancieroID,
};
