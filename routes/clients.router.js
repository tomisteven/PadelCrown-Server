const Router = require("express");

const { createClient, getClients, editClient, deleteClient, crearClientesExistentes } = require("../controllers/clients.controller");
const { autenticacion } = require("../middlewares/autenticacion.js");

const router = Router()



router.get("/", [autenticacion],  getClients)
router.post("/create", [autenticacion] , createClient);
router.patch("/update/:id",[autenticacion] ,editClient);
router.delete("/delete/:id" ,deleteClient);
router.post("/create/existentes", [autenticacion], crearClientesExistentes);



module.exports = router;