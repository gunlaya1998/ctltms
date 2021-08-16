const mongoose = require("mongoose");
const Int32 = require("mongoose-int32").loadType(mongoose);
const Schema = mongoose.Schema;

let option_carSize = new Schema({
    size_id: {type: Int32},
    size_name: {type: String}
} 
, { collection : 'system_carSize' }
, { strict: false }
);

module.exports = mongoose.model("option_carSize", option_carSize);