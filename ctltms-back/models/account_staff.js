const mongoose = require("mongoose");
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');

const account_staffSchema = new mongoose.Schema({
    account: { 
        type: String,
        trim: true,
        required: true, 
        maxlength: 32,
    },
    status: { 
        type: String,
        default: "activate", 
    },
    role: { 
        type: String,
        required: true,
    },
    first_name: { 
        type: String,
        trim: true,
        required: true,
    },
    last_name: { 
        type: String,
        trim: true,
        required: true,    
    },
    telephone: {
        type: String,
        trim: true,
        required: true, 
        unique: 32,    
    }, 
    nickname : {
        type: String,
        trim: true,
    },
    hashed_password: {
        type: String,
        default: 'staff98765',
    },
    salt : String,
    history: {
        type: Array,
        default: []
    }
} ,
{ timestamps: true},
{ collection : 'account_staff' },
{ strict: false }
);

module.exports = mongoose.model("account_staff", account_staffSchema);