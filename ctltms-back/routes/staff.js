const express = require('express');
const router = express.Router()

const { allStaff } = require("../controllers/account_staff");
// const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

// router.get('/:staffId', requireSignin, isAuth, isAdmin, (req, res) => {
//     res.json({
//         user: req.profile
//     })
// })

// router.param('staffId', staffById);

router.get('', allStaff);

module.exports = router;