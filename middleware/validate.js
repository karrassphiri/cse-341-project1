const validator = require('validator');

const validate = (data, rules, customMessages, callback) => {
    const validation = new validator(data, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

const getStudentById = (req, res, next) => {
    const validationRule = {
        id: 'required|string'  
    };

    const validationData = {
        id: req.params.id
    };

    validate(validationData, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

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
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    getStudentById,
    saveStudent
};
