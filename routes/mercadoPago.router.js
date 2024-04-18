const Router = require("express");
const router = Router();

const {
  createPayment,
  //successPay,
  failurePay,
/*   webhookPay, */
createPayment2
} = require("../controllers/mercadoPago.controller");


router.post("/create-payment", createPayment)
router.post("/create-payment2", createPayment2)
//router.get("/success", successPay);
/* router.get("/webhook", webhookPay); */
router.get("/failure", failurePay);



module.exports = router;
