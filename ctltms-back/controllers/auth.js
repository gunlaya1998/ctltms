const account_customer = require('../models/account_customer');
const account_staff = require('../models/account_staff');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {
    console.log("req.body", req.body);
    const user = new account_customer(req.body);
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err: errorHandler(err)
            });
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json({
            user
        });
    });
};

exports.signupStaff = (req, res) => {
    console.log("req.body", req.body);
    const user = new account_staff(req.body);
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err: errorHandler(err)
            });
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json({
            user
        });
    });
};

exports.signin = (req, res) => {
    const { account, password } = req.body
    account_customer.findOne({account}, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                err: 'ไม่พบบัญชีผู้ใช้งาน'
            });
        }
        // if user is found, make sure {account, password} is matched
        // create authen method in user model
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "บัญชีผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"
            })
        }
        // gen a signin token with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

        //persist the token as 't' in cookie with expire data
        res.cookie('t', token, {expire: new Date() + 9999})

        //return response with user and token to frontend
        const {_id, account, status, first_name, last_name, telephone, email, company, Business} = user
        return res.json( {token, user: {_id, account, status, first_name, last_name, telephone, email, company, Business} })
    })
};

exports.signout = (req, res) => {
    res.clearCookie('t')
    res.json({ message: "ออกจากระบบ" })
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if(!user){
        return res.status(403).json({
            error: "ไม่สามารถเข้าถึงข้อมูลได้"
        });
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role !== 'Admin'){
        return res.status(403).json({
            error: 'ถูกปฏิเสธการเข้าถึงเนื่องจากไม่ใช่ Administrator'
        });
    }   
    next();
}