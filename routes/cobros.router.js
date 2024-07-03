const Router = require("express");
const {
  getClientesFinancieros,
  createClienteFinanciero,
  getClienteFinancieroID,
} = require("../controllers/cobros.controller");

const router = Router();

router.get("/", getClientesFinancieros);
router.get("/:id", getClienteFinancieroID);

router.post("/nuevo", createClienteFinanciero);

module.exports = router;
