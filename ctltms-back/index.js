const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const router = express.Router();
const PORT = 4000;

let accounts = require("./models/account");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://kanlaya_je:oetahPfc8nygUwCo@cluster0.tamel.mongodb.net/mock_ctl?retryWrites=true&w=majority", {
    useNewUrlParser: true
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

