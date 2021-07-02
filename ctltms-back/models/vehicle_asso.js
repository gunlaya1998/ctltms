const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let vehicle_asso = new Schema({
    car_brand:    { type: String },
    car_model: { type: String },
    car_size: { type: String },
    car_type: { type: String },
    car_temp_start: {type: Number}, 
    car_temp_end: {type: Number}, 
    plate_no : {type: String},
    plate_province : {type: String},
    weight : {type: Number},
    owner : {type: String},
    price : {type: Number},
} 
, { collection : 'vehicle_asso' }
, { strict: false }
);

module.exports = mongoose.model("vehicle_asso", vehicle_asso);