const Router = require("express");
const { createProduct, getProducts, editProduct, allStock } = require("../controllers/products.controllers");



const router = Router()
router.get("/",  getProducts)
router.post("/create", createProduct);
router.patch("/update/:id", editProduct);
router.patch("/allStock", allStock);



module.exports = router;