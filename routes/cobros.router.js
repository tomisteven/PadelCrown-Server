const Router = require("express");
const {

  getClienteFinancieroID,
  crearNuevoPago,
  getIntereses,
  crearNuevaFinanciacion,
  RegistrarNuevoCliente,

} = require("../controllers/cobros.controller");

const router = Router();

router.get("/in/interes", getIntereses);
router.get("/:id", getClienteFinancieroID);

router.post("/cliente/login", RegistrarNuevoCliente);
router.post("/nuevo-cliente", RegistrarNuevoCliente);
router.post("/pago/:id_cliente/cuota/:id_cuota", crearNuevoPago);


router.post("/nueva-financiacion/:id", crearNuevaFinanciacion);
/* router.post("/generar-financiacion/:id", generarFinanciacionFinal); */


module.exports = router;
