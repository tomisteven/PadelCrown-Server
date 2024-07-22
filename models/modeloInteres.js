const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interesSchema = new Schema({
  tipo: String,
  interes: Number,
  cuotasMax: Number,
  cuotasMin: Number,
  produccion: String,
  envio : String,
  cancelacion : String,
  abandonoDeCuota : String,
  adelantoDeCuotas : String,
});

const Interes = mongoose.model("Interes", interesSchema);

module.exports = Interes;
