const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clienteFinancieroSchema = new Schema({
  username: String,
  password: String,
  nombre: String,
  apellido: String,
  telefono: String,
  email: String,
  dni: String,
  direccion: String,
  provincia: String,
  cuotas: Number,
  producto: String,
  tipoPago: String,
  estadoActual: {
    type: Boolean,
    default: false,
  },
  totalAbonado: Number,
  confirmadoPorAdministracion: {
    type: Boolean,
    default: false,
  },
  pagos: [
    {
      fecha: String,
      monto: Number,
      cuota: Number,
    },
  ],
  historial: [
    {
      fecha: String,
      monto: Number,
      cuota: Number,
      producto: String,
    },
  ],
  fechaCreacion: String,
  pagando: Boolean,
  cuotasAPagar: [
    {
      cuota: Number,
      valor: Number,
      fechaPago: String,
      pagada: Boolean,
    },
  ],
  financiacion: [
    {
      tipo: String,
      estado: String,
      producto: String,
      interes: Number,
      cuotas: [
        {
          cuota: Number,
          valor: Number,
          pagada: Boolean,
          fechaPago: String,
        },
      ],
    },
  ],
  historialFinanciacion: [
    {
      tipo: String,
      producto: String,
      interes: Number,
      cuotas: [
        {
          cuota: Number,
          valor: Number,
          pagada: Boolean,
          fechaPago: String,
        },
      ],
    },
  ],
});

const ClienteFinanciero = mongoose.model(
  "ClienteFinanciero",
  clienteFinancieroSchema
);
module.exports = ClienteFinanciero;
