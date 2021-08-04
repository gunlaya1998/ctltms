const mongoose = require("mongoose");
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');

const account_customerSchema = new mongoose.Schema(
    {
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
            // unique: 32,
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
        hashed_password: { 
            type: String,
            // default: "12345",
            // maxlength: 25,
        },
        salt : String,
        history: {
            type: Array,
            default: []
        }
    }, 
    { timestamps: true},
    { collection : 'account_customer' }, 
    { strict: false },
);

// virtual field
account_customerSchema.virtual('password')
.set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
})
.get(function() {
    return this._password;
})

account_customerSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function(password) {
        if(!password) return '';
        try {
            return crypto.createHmac('sha1', this.salt)
                            .update(password)
                            .digest('hex')
        } catch (err) {
            return '';
        }
    }
}

module.exports = mongoose.model("account_customer", account_customerSchema);