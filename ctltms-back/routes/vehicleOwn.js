const express = require('express');
const router = express.Router()

const { vehicle_own, signupOwnVehicle } = require("../controllers/vehicle_own");

router.post("/signup", signupOwnVehicle);
router.get('', vehicle_own);

module.exports = router;