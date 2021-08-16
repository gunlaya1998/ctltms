const express = require('express');
const router = express.Router()

const { Log } = require("../controllers/account_log");
router.get('', Log);

module.exports = router;