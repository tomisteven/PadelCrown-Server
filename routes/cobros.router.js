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
  editarCliente


} = require("../controllers/cobros.controller");

const router = Router();

router.get("/in/interes", getIntereses);
router.get("/:id", getClienteFinancieroID);

router.post("/cliente/login", loginCliente);
router.post("/nuevo-cliente", RegistrarNuevoCliente);
router.post("/pago/:id_cliente/cuota/:id_cuota", crearNuevoPago);

router.get("/eliminar/financiacion/:id", eliminarFinanciacion);

router.delete("/cliente/eliminar/:id", eliminarCliente);


router.patch("/editar/:id", editarCliente);

router.post("/nueva-financiacion/:id", crearNuevaFinanciacion2);
/* router.post("/generar-financiacion/:id", generarFinanciacionFinal); */


module.exports = router;


/*  crear funcion que avise por mail cuando un cliente completo todas las cuotas */
