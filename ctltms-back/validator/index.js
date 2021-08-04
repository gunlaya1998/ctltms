exports.userSignupValidator = (req, res, next) => {
    req.check('account', 'Account name is required').notEmpty();
    req.check('first_name', 'Firstname is required').notEmpty();
    req.check('last_name', 'Lastname is required').notEmpty();
    req.check('telephone', 'Telephone number is required').notEmpty();
    req.check('company', 'Lastname is required').notEmpty();
    req.check('Business', 'Telephone number is required').notEmpty();
    // req.check('email', 'Email must be between 3 to 32 characters')
    //     .matches(/.+\@.+\..+/)
    //     .withMessage("Email must contain @");
    // req.check('password')
    //     .isLength({min: 6})
    //     .withMessage('รหัสผ่านต้องประกอบด้วยอย่างน้อย 5 ตัว');
    const errors = req.validationErrors()
    if(errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
}

exports.staffSignupValidator = (req, res, next) => {
    req.check('account', 'Account name is required').notEmpty();
    req.check('first_name', 'Firstname is required').notEmpty();
    req.check('last_name', 'Lastname is required').notEmpty();
    req.check('telephone', 'Telephone number is required').notEmpty();
    // req.check('email', 'Email must be between 3 to 32 characters')
    //     .matches(/.+\@.+\..+/)
    //     .withMessage("Email must contain @");
    // req.check('password')
    //     .isLength({min: 6})
    //     .withMessage('รหัสผ่านต้องประกอบด้วยอย่างน้อย 5 ตัว');
    const errors = req.validationErrors()
    if(errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
}