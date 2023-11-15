const Client = require("../models/tableClients");

const findClient = async (req, res) => {
  const { dni } = req.params;

  try {
    const clients = await Client.find({ dni: dni });
    res.status(200).json({estado : clients[0].estadoPedido, cliente:  clients[0].nombre, fecha: clients[0].fechaCompra, pedido : clients[0].producto})
  } catch (error) {
    res.status(404).json({ message: "No se encontro a ninguna persona con ese DNI." });
  }
};

module.exports = {
  findClient
};
