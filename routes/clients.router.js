const Router = require("express");

const { createClient, getClients, editClient, deleteClient, crearClientesExistentes, editGananciasAll, updateEstadoPedido, addStateDefault, getOneClient, addComentario, addComentarioAll, deleteLinkSeguimiento, getClientsEliminados, addStateEliminado, restoreClient, deleteClientPermanently,deleteAllClientPermanently, getClientesIncompletos  } = require("../controllers/clients.controller");
const { autenticacion } = require("../middlewares/autenticacion.js");

const router = Router()



router.get("/", [autenticacion],  getClients)
router.get("/incompletos", [autenticacion],  getClientesIncompletos)
router.get("/eliminados", [autenticacion],  getClientsEliminados)
router.patch("/restore/:id", [autenticacion], restoreClient  );
router.delete("/delete/:id/permanently", [autenticacion], deleteClientPermanently );
router.get("/delete/all/permanently", [autenticacion], deleteAllClientPermanently );
router.post("/eliminados/e", [autenticacion], addStateEliminado );
router.get("/:id", [autenticacion],  getOneClient)
router.post("/create", [autenticacion] , createClient);
router.patch("/update/:id",[autenticacion] ,editClient);
router.delete("/delete/:id" ,deleteClient);
router.get("/delete/:id/link" , deleteLinkSeguimiento );
router.post("/create/existentes", [autenticacion], crearClientesExistentes);
router.patch("/updateganancias/",[autenticacion] ,editGananciasAll);
router.post("/estado/:id",[autenticacion] ,updateEstadoPedido);
router.post("/estado",[autenticacion] ,addStateDefault);
router.post("/comentario/:id",[autenticacion] ,addComentario);
router.post("/comentariosall",[autenticacion] ,addComentarioAll);


module.exports = router;