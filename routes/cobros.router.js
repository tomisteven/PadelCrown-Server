const Router = require("express");
const {

  getClienteFinancieroID,
  crearNuevoPago,
  getIntereses,
  crearNuevaFinanciacion,
  crearNuevaFinanciacion2,
  RegistrarNuevoCliente,
  eliminarCliente,
  eliminarFinanciacion,
  loginCliente,


} = require("../controllers/cobros.controller");

const router = Router();

router.get("/in/interes", getIntereses);
router.get("/:id", getClienteFinancieroID);

router.post("/cliente/login", loginCliente);
router.post("/nuevo-cliente", RegistrarNuevoCliente);
router.post("/pago/:id_cliente/cuota/:id_cuota", crearNuevoPago);

router.get("/eliminar/financiacion/:id", eliminarFinanciacion);

router.delete("/cliente/eliminar/:id", eliminarCliente);


router.post("/nueva-financiacion/:id", crearNuevaFinanciacion2);
/* router.post("/generar-financiacion/:id", generarFinanciacionFinal); */


module.exports = router;
