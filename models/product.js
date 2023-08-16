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
  description: {
    type: String,
    required: true,
  },
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
    }
  ],
  nucleo: [
    {
        type: String,
        required: true,
    }
    ],
    balance: [
        {
            type: String,
            required: true,
        }
    ],

  url: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
