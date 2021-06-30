const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let account_customer = new Schema({
    account:    { type: String },
    status: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    telephone: {type: String}, 
    email : {type: String},
    compay : {type: String},
    Business : {type: String},

    password: {type: String},
} 
, { collection : 'account_customer' }
, { strict: false }
);

module.exports = mongoose.model("account_customer", account_customer);