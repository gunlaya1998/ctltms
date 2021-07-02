const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let staff = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    nickname: { type: String },
    telephone: {type: String}, 
    license_type : {type: String},
    employment : {type: String},
    status_work : {type: String},
    license_type : {type: String},
    birthday : {type: String},
    id_card : {type: String},
    id_license: {type: String},
    license_start: {type: String},
    license_end: {type: String},
    staff_type: {type: String},
    position: {type: String},
} 
, { collection : 'account_staff' }
, { strict: false }
);

module.exports = mongoose.model("staff", staff);