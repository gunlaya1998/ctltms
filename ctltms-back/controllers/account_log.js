const Log = require('../models/account_log')

exports.Log = (req, res) => {
    Log.find().exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};