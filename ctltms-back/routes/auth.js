const express = require('express');
const router = express.Router()

const { signup, signupStaff, signin, signout, requireSignin } = require("../controllers/auth");
const { userSignupValidator, staffSignupValidator } = require("../validator")

router.post("/signup", userSignupValidator, signup);
router.post("/signupStaff", staffSignupValidator, signupStaff);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;