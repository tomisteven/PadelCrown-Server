const Products = require('../models/product');


const createProduct = async (req, res) => {
    const { name, category, price, image, description, formato, url, nucleo, balance  } = req.body;
    const newProduct = new Products({ name, category, price, url, image, description, formato, nucleo, balance });
    const productSaved = await newProduct.save();
    res.status(201).json(productSaved);
}

const getProducts = async (req, res) => {
    const products = await Products.find();
    res.json(products);
}

const editProduct = async (req, res) => {
    const {id} = req.params;
    const body = req.body;

    const product = await Products.findById(id);
    if(!product) return res.status(204).json()

    Object.keys(body).forEach(key => {
        product[key] = body[key];
      });
      await product.save();
      res.send(product);
}

const allStock = async (req, res) => {

    const products = await Products.find();
    if(!products) return res.status(204).json()
    products.map(async (product) => {
        product.stock = true;
        await product.save();
    })
    res.json(products);


}




module.exports = {
    createProduct,
    getProducts,
    editProduct,
    allStock
}