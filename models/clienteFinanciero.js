const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clienteFinancieroSchema = new Schema({
  userName: String,
  password: String,
  nombre: String,
  telefono: String,
  email: String,
  dni: String,
  direccion: String,
  provincia: String,
  cuotas: Number,
  producto: String,
  tipoPago: String,
  totalAbonado: Number,
  pagos: [
    {
      fecha: String,
      monto: Number,
      cuota: Number,
    },
  ],
  fechaCreacion: String,
  pagando: Boolean,
  cuotasAPagar: [
    {
      cuota: Number,
      valor: Number,
      fechaPago: Number,
      pagada: Boolean,
      confirmacion: String
    },
  ],
  financiacion: [
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
