const Router = require("express");

const { createClient, getClients, editClient, deleteClient, crearClientesExistentes, editGananciasAll, updateEstadoPedido, addStateDefault, getOneClient, addComentario } = require("../controllers/clients.controller");
const { autenticacion } = require("../middlewares/autenticacion.js");

const router = Router()



router.get("/", [autenticacion],  getClients)
router.get("/:id", [autenticacion],  getOneClient)
router.post("/create", [autenticacion] , createClient);
router.patch("/update/:id",[autenticacion] ,editClient);
router.delete("/delete/:id" ,deleteClient);
router.post("/create/existentes", [autenticacion], crearClientesExistentes);
router.patch("/updateganancias/",[autenticacion] ,editGananciasAll);
router.post("/estado/:id",[autenticacion] ,updateEstadoPedido);
router.post("/estado",[autenticacion] ,addStateDefault);
router.post("/comentario/:id",[autenticacion] ,addComentario);


module.exports = router;