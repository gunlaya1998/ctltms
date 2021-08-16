const vehicle_own = require('../models/vehicle_own')
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.vehicle_own = (req, res) => {
    vehicle_own.find().exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.signupOwnVehicle = (req, res) => {
    console.log("req.body", req.body);
    const vehicle = new vehicle_own(req.body);
    vehicle.save((err, vehicle) => {
        if(err){
            return res.status(400).json({
                err: errorHandler(err)
            });
        }
        res.json({
            vehicle
        });
    });
};