const { errorHandler } = require('../helpers/dbErrorHandler');
const Customer = require('../models/account_customer')

// exports.customerById = (req, res, next, id) => {
//     Customer.findById(id).exec((err, user) => {
//         if(err | !user) {
//             return res.status(400).json({
//                 error: 'ไม่พบบัญชีผู้ใช้'
//             })
//         }
//         req.profile = user
//         next();
//     })
// };

exports.allCustomer = (req, res) => {
    Customer.find().exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};