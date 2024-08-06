const ClienteFinanciero = require("../models/clienteFinanciero");
const Interes = require("../models/modeloInteres");

const getClientesFinancieros = async (req, res) => {
  try {
    const clientesFinancieros = await ClienteFinanciero.find();
    res.json(clientesFinancieros);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verificarPago = async (req, res) => {
  const { id_cliente, id_cuota } = req.params;
  const { confirmacion } = req.query;

  const cliente = await ClienteFinanciero.findById(id_cliente);
  const cuotaPaga = cliente.cuotasAPagar.find((i) => i._id == id_cuota);

  if (confirmacion === "Aprobado") {
    cuotaPaga.confirmacion = "Aprobado";
    cuotaPaga.pagada = true;
  } else {
    cuotaPaga.confirmacion = "Rechazado";
    cuotaPaga.pagada = false;
  }
  await cliente.save();

  res.json({ cliente, ok: true });
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

const crearInteres = async (req, res) => {
  const interes = req.body;

  const newInteres = new Interes(interes);
  try {
    await newInteres.save();
    res.status(201).json(newInteres);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const eliminarRegistrosCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await ClienteFinanciero.findById(id);

    if (!cliente) {
      return res.status(400).json({ message: "Cliente no encontrado" });
    }
    cliente.pagos = [];
    cliente.pagando = false;
    cliente.cuotasAPagar = [];
    cliente.financiacion = [];
    cliente.totalAbonado = 0;
    cliente.cuotas = 0;
    cliente.producto = "";

    await cliente.save();
    res.json({ message: "Registros eliminados", ok: true });
  } catch (error) {
    res.status(500).json({ message: error.message, ok: false });
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

module.exports = {
  createClienteFinanciero,
  crearInteres,
  getClientesFinancieros,
  verificarPago,
  eliminarRegistrosCliente
};
