const Staff = require('../models/account_staff')
const { errorHandler } = require('../helpers/dbErrorHandler');

// exports.staffById = (req, res, next, id) => {
//     User.findById(id).exec((err, user) => {
//         if(err | !user) {
//             return res.status(400).json({
//                 error: 'ไม่พบบัญชีผู้ใช้'
//             })
//         }
//         req.profile = user
//         next();
//     })
// }

exports.allStaff = (req, res) => {
    Staff.find().exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};