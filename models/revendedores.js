const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    telefono: {
        type: Number,
        required: true,
    },
    perfil : String,
    email: String,
})

module.exports = mongoose.model("Revendedores", ProductSchema);