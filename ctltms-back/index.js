const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const router = express.Router();
const PORT = 4000;

let accounts = require("./models/account");
let staffaccount = require("./models/account_staff");
let customeraccount = require("./models/account_customer");
let log = require("./models/account_log");
let vehicle_own = require("./models/vehicle_own");
let vehicle_asso = require("./models/vehicle_asso");
let staff = require("./models/staff");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://kanlaya_je:oetahPfc8nygUwCo@cluster0.tamel.mongodb.net/mock_ctl?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology:true
});

const connection = mongoose.connection;

connection.once("open", function() {
    console.log("Connection with MongoDB was successful");
});

app.use("/", router);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

router.route("/account").get(function(req, res) {
    accounts.find({ $and: [
        { username: req.query.username },
        { password: req.query.password } 
    ] }, function(err, result) {
        if (err) {
            res.send({err: err});
        }
        if (result.length > 0){
            res.send(result);
        }
        else {
            res.send({message: "ชื่อบัญชีผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง"});
        }
    });
});

router.route("/staffaccount").get(function(req, res) {
    staffaccount.find({}
    , function(err, result) {
        if (err) {
            res.send({err: err});
        }
        else {
            res.send(result);
        }
    });
});

router.route("/customeraccount").get(function(req, res) {
    customeraccount.find({}
    , function(err, result) {
        if (err) {
            res.send({err: err});
        }
        else {
            res.send(result);
        }
    });
});

router.route("/log").get(function(req, res) {
    log.find({}
    , function(err, result) {
        if (err) {
            res.send({err: err});
        }
        else {
            res.send(result);
        }
    });
});

router.route("/vehicle").get(function(req, res) {
    vehicle_own.find({}
    , function(err, result) {
        if (err) {
            res.send({err: err});
        }
        else {
            res.send(result);
        }
    });
});

router.route("/vehicleAsso").get(function(req, res) {
    vehicle_asso.find({}
    , function(err, result) {
        if (err) {
            res.send({err: err});
        }
        else {
            res.send(result);
        }
    });
});

router.route("/staff").get(function(req, res) {
    staff.find({}
    , function(err, result) {
        if (err) {
            res.send({err: err});
        }
        else {
            res.send(result);
        }
    });
});