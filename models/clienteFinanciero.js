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
  cuotas: Number,
  producto: [
    {
      nombre: String,
      precio: Number,
      cuotas: Number
    }
  ],
  tipoPago: String,
  pagos: [
    {
      fecha: String,
      monto: Number,
      cuota: Number,
    },
  ],
  fechaCreacion: String,
  pagando: Boolean,
});

const ClienteFinanciero = mongoose.model(
  "ClienteFinanciero",
  clienteFinancieroSchema
);
module.exports = ClienteFinanciero;
