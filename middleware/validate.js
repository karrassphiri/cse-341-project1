const validate = require('../helpers/validate');

const saveStudent = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        DoB: 'required|string',
        grade: 'required|string',
        address: 'string',
        contactNumber: 'required|string',
        email: 'required|email'
    };
    validate(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveStudent
};
