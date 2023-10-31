const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  producto: {
    type: String,
  },
  nOrden: String,
  fechaCompra: {
    type: String,
  },
  fechaDespacho: {
    type: String,
  },
  telefono: {
    type: String,
  },
  email: {
    type: String,
  },
  direccion: {
    type: String,
  },
  localidad: {
    type: String,
  },
  provincia: {
    type: String,
  },
  precio: {
    type: Number,
  },
  costo: {
    type: Number,
  },
  ganancia: {
    type: Number
  },
  envio: {
    type: Number,
  },
  formaPago: {
    type: String,
  },
  comisionVendedor: {
    type: Number,
  },
  valorCarbono: {
    type: Number,
  },
  comentarios: {
    type: String,
  },
  linkSeguimiento: {
    type: String,
  },
  estado: {
    type: String,
    default: "Confirmado",
  },
  estadoPedido: [
    {
      estado: {
        type: String,
        default: "Confirmado",
      },
      fecha: {
        type: Date,
        default: Date.now(),
      },
    }
  ],
  comentarios : [
    {
      comentario: {
        type: String,
        default: "Confirmado",
      },
      fecha: {
        type: Date,
        default: Date.now(),
      },
    }
  ]

});

module.exports = mongoose.model("Client", ClientSchema);
