const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let accounts = new Schema({
        uid:    { type: String },
        username: { type: String },
        password: { type: String },
        roles: { type: String }
    } 
    , { collection : 'account' }
    , { strict: false }
);

module.exports = mongoose.model("accounts", accounts);