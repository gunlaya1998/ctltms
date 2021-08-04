const express = require('express');
const router = express.Router()

const { allCustomer } = require("../controllers/account_user");
// const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

// router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
//     res.json({
//         user: req.profile
//     })
// })

// router.param('userId', userById);
router.get("", allCustomer);

module.exports = router;