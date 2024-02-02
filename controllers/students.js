const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const validator = require('../helpers/validate');

const saveStudent = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        DoB: 'required|string',
        grade: 'required|string',
        address: 'required|string',
        contactNumber: 'required|string',
        email: 'required|email',
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).json({
                success: false,
                message: 'Validation failed',
                data: err,
            });
        } else {
            next();
        }
    });
};

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().collection('students').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error getting students', error: error.message });
    }
};

const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid student id to find a student.');
        return;
    }

    try {
        const studentId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('students').find({ _id: studentId }).toArray();

        if (result.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error getting student', error: error.message });
    }
};

const createStudent = async (req, res) => {
    const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        DoB: req.body.DoB,
        grade: req.body.grade,
        address: req.body.address,
        contactNumber: req.body.contactNumber,
        email: req.body.email,
    };

    try {
        const validationRule = {
            firstName: 'required|string',
            lastName: 'required|string',
            DoB: 'required|string',
            grade: 'required|string',
            address: 'required|string',
            contactNumber: 'required|string',
            email: 'required|email',
        };

        validator(student, validationRule, {}, (err, status) => {
            if (!status) {
                res.status(412).json({
                    success: false,
                    message: 'Validation failed',
                    data: err,
                });
            } else {
                // Validation passed, proceed with database insertion
                mongodb.getDb().collection('students').insertOne(student, (insertErr, response) => {
                    if (insertErr) {
                        res.status(500).json({ message: 'Some error occurred while creating the student', error: insertErr });
                    } else {
                        res.status(201).send();
                    }
                });
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating student', error: error.message });
    }
};

const updateStudent = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid student id to update a student.');
        return;
    }

    const studentId = new ObjectId(req.params.id);
    const updatedStudent = {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            DoB: req.body.DoB,
            grade: req.body.grade,
            address: req.body.address,
            contactNumber: req.body.contactNumber,
            email: req.body.email,
        },
    };

    try {
        // Include your validation logic here if needed

        const response = await mongodb.getDb().collection('students').updateOne({ _id: studentId }, updatedStudent);

        if (response.modifiedCount > 0) {
            res.status(200).send();
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating student', error: error.message });
    }
};

const deleteStudent = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid student id to delete a student.');
        return;
    }

    const studentId = new ObjectId(req.params.id);

    try {
        const response = await mongodb.getDb().collection('students').deleteOne({ _id: studentId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student', error: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createStudent,
    updateStudent,
    deleteStudent,
    saveStudent, 
};
