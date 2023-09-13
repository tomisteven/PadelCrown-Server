const Router = require("express");


const { createRevendedor, getRevendedores } = require("../controllers/revendedores.controller");
const e = require("express");
const router = Router()


router.get("/",  getRevendedores)
router.post("/", createRevendedor);



module.exports = router;