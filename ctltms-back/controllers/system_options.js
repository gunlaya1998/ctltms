const Province = require('../models/option_province')
const CarSize = require('../models/option_carSize')

exports.Province = (req, res) => {
    Province.find().exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.CarSize = (req, res) => {
    CarSize.find().exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};