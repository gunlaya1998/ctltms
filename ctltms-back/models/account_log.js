const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let account_log = new Schema({
    timestamp: { type: String },
    account: { type: String },
    role:    { type: String },
    first_name: { type: String },
    last_name: { type: String },
    compay : {type: String},
    telephone: {type: String}, 
} 
, { collection : 'account_log' }
, { strict: false }
);

module.exports = mongoose.model("account_log", account_log);