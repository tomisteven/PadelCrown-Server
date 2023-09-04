const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: [
    {
        type: String,
        required: true,
    }
  ],
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  formato: [
    {
        type: String,
        required: true,
        default: "Redonda",
    }
  ],
  nucleo: [
    {
        type: String,
        required: true,
        default: "Foam",
    }
    ],
    balance: [
        {
            type: String,
            required: true,
            default: "Medio",
        }
    ],
    stock: {
        type: Boolean,
        default: true,
    },

  url: {
    type: String,
    required: true,
    default:"https://padelcrown.com.ar/"
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;


/* Paleta Full Carbono, Nucleo Foam/Soft, Paleta para jugadores Intermedios/Avanzados, Control con potencia, Peso de 360-375*/