const Router = require("express");

const { createClient, getClients, editClient, deleteClient, crearClientesExistentes } = require("../controllers/clients.controller");

const router = Router()



router.get("/",  getClients)
router.post("/create", createClient);
router.patch("/update/:id", editClient);
router.delete("/delete/:id", deleteClient);
router.post("/create/existentes", crearClientesExistentes);



module.exports = router;