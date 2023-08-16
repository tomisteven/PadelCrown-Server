const Router = require("express");
const { createProduct, getProducts, editProduct } = require("../controllers/products.controllers");



const router = Router()
router.get("/",  getProducts)
router.post("/create", createProduct);
router.patch("/update/:id", editProduct);



module.exports = router;