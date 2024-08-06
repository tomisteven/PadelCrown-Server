const Router = require("express");
const router = Router();
const {
  createClienteFinanciero,
  crearInteres,
  getClientesFinancieros,
  verificarPago,
  eliminarRegistrosCliente
} = require("../controllers/cobrosAdmin.controller.js");

router.get("/", getClientesFinancieros);
router.post("/nuevo", createClienteFinanciero);
router.post("/interes", crearInteres);
router.post("/verificar/pago/:id_cliente/cuota/:id_cuota", verificarPago);

router.get("/vaciar/:id", eliminarRegistrosCliente)

module.exports = router;
