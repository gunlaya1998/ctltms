const express = require('express');
const router = express.Router()

const { Province, CarSize } = require("../controllers/system_options");

router.get("/province", Province);
router.get('/carSize', CarSize);

module.exports = router;