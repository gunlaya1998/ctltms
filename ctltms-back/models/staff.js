const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let staff = new Schema({
    // first_name: { type: String },
    // last_name: { type: String },
    // nickname: { type: String },
    // telephone: {type: String}, 
    // license_type : {type: String},
    // employment : {type: String},
    // status_work : {type: String},
    // license_type : {type: String},
    // birthday : {type: String},
    // id_card : {type: String},
    // id_license: {type: String},
    // license_start: {type: String},
    // license_end: {type: String},
    // staff_type: {type: String},
    // position: {type: String},
    first_name: { type: String },
    last_name: { type: String },
    telephone: { type: String },
    status_employment: { type: String },
    status_work: { type: String },
    birthday: { type: String },
    id_no: { type: String },
    license_type: { type: String },
    license_no: { type: String },
    license_issueDate: { type: String },
    license_expireDate: { type: String },
    driver_type: { type: String },
    wage: { type: String },
    date_start:{ type: String },
    date_end: { type: String },
    emergency_name_1: { type: String },
    emergency_telephone_1: { type: String },
    emergency_name_2: { type: String },
    emergency_telephone_2: { type: String }
} 
, { collection : 'staff' }
, { strict: false }
);

module.exports = mongoose.model("staff", staff);