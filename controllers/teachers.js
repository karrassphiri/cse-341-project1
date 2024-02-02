const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const validator = require('../helpers/validate');

const saveTeacher = async (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        contactNumber: 'required|string',
        gender: 'required|string'
    };

    try {
        await validator(req.body, validationRule, {});
        next();
    } catch (err) {
        res.status(412).json({
            success: false,
            message: 'Validation failed',
            data: err
        });
    }
};

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().collection('teachers').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error getting teachers', error: error.message });
    }
};

const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid teacher id to find a teacher.');
        return;
    }

    try {
        const teacherId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('teachers').find({ _id: teacherId }).toArray();

        if (result.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: 'Teacher not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error getting teacher', error: error.message });
    }
};

const createTeacher = async (req, res) => {
    const teacher = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        contactNumber: req.body.contactNumber,
        gender: req.body.gender
    };

    try {
        const validationRule = {
            firstName: 'required|string',
            lastName: 'required|string',
            contactNumber: 'required|string',
            gender: 'required|string'
        };

        await validator(teacher, validationRule, {});

        const response = await mongodb.getDb().collection('teachers').insertOne(teacher);

        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the teacher.');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error creating teacher', error: error.message });
    }
};


const updateTeacher = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid teacher id to update a teacher.');
        return;
    }

    const teacherId = new ObjectId(req.params.id);
    const updatedTeacher = {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            contactNumber: req.body.contactNumber,
            gender: req.body.gender
        },
    };

    try {
        // Include your validation logic here if needed

        const response = await mongodb.getDb().collection('teachers').updateOne({ _id: teacherId }, updatedTeacher);

        if (response.modifiedCount > 0) {
            res.status(200).send();
        } else {
            res.status(404).json({ message: 'Teacher not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating teacher', error: error.message });
    }
};

const deleteTeacher = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid teacher id to delete a teacher.');
        return;
    }

    const teacherId = new ObjectId(req.params.id);

    try {
        const response = await mongodb.getDb().collection('teachers').deleteOne({ _id: teacherId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Teacher not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting teacher', error: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    saveTeacher
};
