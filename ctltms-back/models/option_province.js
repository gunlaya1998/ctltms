const mongoose = require("mongoose");
const Int32 = require("mongoose-int32").loadType(mongoose);
const Schema = mongoose.Schema;

let option_province = new Schema({
    PROVINCE_ID: { type: Int32 },
    PROVINCE_CODE: { type: String },
    PROVINCE_NAME: { type: String },
    GEO_ID: { type: Int32 }
} 
, { collection : 'system_province' }
, { strict: false }
);

module.exports = mongoose.model("option_province", option_province);