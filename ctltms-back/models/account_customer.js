const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let account_customer = new Schema(
    {
        account: { 
            type: String,
            trim: true,
            required: true, 
            maxlength: 32,
        },
        status: { 
            type: String,
            trim: true,
            required: true, 
            maxlength: 32,
        },
        first_name: { 
            type: String,
            trim: true,
            required: true, 
            // maxlength: 32,
        },
        last_name: { 
            type: String,
            trim: true,
            required: true, 
            // maxlength: 32,
        },
        telephone: { 
            type: String,
            trim: true,
            required: true, 
            unique: 32,
        },
        email : { 
            type: String,
            trim: true,
            unique: 32,
        },
        company : { 
            type: String,
            trim: true,
            required: true, 
            // maxlength: 32,
        },
        Business : { 
            type: String,
            trim: true,
            required: true, 
            // maxlength: 32,
        },
        password: { 
            type: String,
            required: true, 
            maxlength: 25,
        },
    } , 
    { collection : 'account_customer' }, 
    { strict: false },
    { timestamps: true},
);

module.exports = mongoose.model("account_customer", account_customer);