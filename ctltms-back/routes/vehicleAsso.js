const express = require('express');
const router = express.Router()

const { vehicle_asso, signupAssoVehicle } = require("../controllers/vehicle_asso");

router.post("/signup", signupAssoVehicle);
router.get('', vehicle_asso);

module.exports = router;