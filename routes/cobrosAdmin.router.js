const Router = require("express");
const router = Router();
const {
  createClienteFinanciero,
  crearInteres,
  getClientesFinancieros,
  verificarPago,
  eliminarRegistrosCliente,
  confirmarFinanciacionA
} = require("../controllers/cobrosAdmin.controller.js");

router.get("/", getClientesFinancieros);
router.post("/nuevo", createClienteFinanciero);
router.post("/interes", crearInteres);
router.post("/verificar/pago/:id_cliente/cuota/:id_cuota", verificarPago);

router.get("/confirmar/cliente/:id", confirmarFinanciacionA );

router.get("/vaciar/:id", eliminarRegistrosCliente)

module.exports = router;
