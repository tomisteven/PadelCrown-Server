const Router = require("express");
const router = Router();
const {
  createRifa,
  deleteAllRifas,
  asignarRifa,
  getRifas,
  getRifa,
  editRifa,
} = require("../controllers/rifa.controller");

router.post("/create", createRifa);
router.delete("/delete", deleteAllRifas);

router.get("/get", getRifas);
router.get("/get/:rifa_id", getRifa);

router.get("/asignar", asignarRifa);

router.patch("/edit/:rifa_id", editRifa);

module.exports = router;
