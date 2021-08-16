const vehicle_asso = require('../models/vehicle_asso')
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.vehicle_asso = (req, res) => {
    vehicle_asso.find().exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.signupAssoVehicle = (req, res) => {
    console.log("req.body", req.body);
    const vehicle = new vehicle_asso(req.body);
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