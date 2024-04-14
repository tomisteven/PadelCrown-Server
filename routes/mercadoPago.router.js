const Router = require("express");
const router = Router();

const {
  createPayment,
  //successPay,
  failurePay,
/*   webhookPay, */
} = require("../controllers/mercadoPago.controller");


router.post("/create-payment", createPayment);
//router.get("/success", successPay);
/* router.get("/webhook", webhookPay); */
router.get("/failure", failurePay);



module.exports = router;
