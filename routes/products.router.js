const Router = require("express");
const { createProduct, getProducts, editProduct, allStock, deleteProduct } = require("../controllers/products.controllers");



const router = Router()
router.get("/",  getProducts)
router.post("/create", createProduct);
router.patch("/update/:id", editProduct);
router.patch("/allStock", allStock);

router.delete("/delete/:id", deleteProduct);



module.exports = router;