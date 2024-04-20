const Client = require("../models/tableClients");

const findClient = async (req, res) => {
  const { dni } = req.params;

  try {
    const clients = await Client.find({ dni: dni, eliminado: false });
    /* res.status(200).json({estado : clients[0].estadoPedido, cliente:  clients[0].nombre, fecha: clients[0].fechaCompra, pedido : clients[0].producto, link: clients[0].linkSeguimiento}) */
    clients.length > 0
      ? res.status(200).json(clients)
      : res
          .status(404)
          .json({ message: "No se encontro a ninguna persona con ese DNI." });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Error en el Servidor." });
  }
};

module.exports = {
  findClient,
};
