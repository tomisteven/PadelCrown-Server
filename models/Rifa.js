const boolean = require("@hapi/joi/lib/types/boolean");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Rifa = new Schema({
  name: String,
  rifa: [
    {
      numero: Number,
      fecha: String,
      estado: Boolean,
      comprador: String,
      precio: Number,
      emailComprador: String,
      telefonoComprador: String,
      dni: String,
      codigoIdentificacionRifa: String,
    },
  ],
});

module.exports = mongoose.model("Rifa", Rifa);
