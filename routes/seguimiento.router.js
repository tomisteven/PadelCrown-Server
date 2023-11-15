const Router = require("express");


const { findClient } = require("../controllers/seguimiento.controller");

const router = Router()


router.get("/:dni",  findClient)



module.exports = router;