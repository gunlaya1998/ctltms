const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let account_staff = new Schema({
    account:    { type: String },
    status: { type: String },
    roles: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    telephone: {type: String}, 
    email : {type: String},
    password: {type: String}
} 
, { collection : 'account_staff' }
, { strict: false }
);

module.exports = mongoose.model("account_staff", account_staff);