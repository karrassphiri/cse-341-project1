const { response } = require('express');
const mongodb = require('../data/database'); //This import calls the Mongodb database
const ObjectId = require('mongodb').ObjectId; // this is the primary key that Mongo assigns

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().collection('students').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json('Error getting students: ' + error.message);
    }
};

const getSingle = (req, res) => {
    //#swagger.tags=['Users']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid student id to find student');
    }
    const studentId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db()
      .collection('students')
      .find({ _id: studentId })
      .toArray((err, result) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
      });
  };

const createStudent = async (req, res) => {
        //#swagger.tags=['Users']
    const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        DoB: req.body.DoB,
        grade: req.body.grade,  
        address: req.body.address,
        contactNumber: req.body.contactNumber,
        email: req.body.email  
    };

    try {
        const response = await mongodb.getDb().collection('students').insertOne(student);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the student.');
        }
    } catch (error) {
        res.status(500).json('Error creating student: ' + error.message);
    }
};

//This is the update user function
const updateStudent = async (req, res) => {
    //#swagger.tagss=['Users']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid student id to update student');
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
            email: req.body.email  
         }
    };

    try {
        const response = await mongodb.getDb().collection('students').updateOne({ _id: studentId }, updatedStudent);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'student not found' });
        }
    } catch (error) {
        res.status(500).json('Error updating student: ' + error.message);
    }
};


//This is the delete student function
const deleteStudent = async (req, res) => {
    //#swagger.tags=['Users']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid student id to delete student');
    }
    const studentId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDb().collection('students').deleteOne({ _id: studentId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'student not found' });
        }
    } catch (error) {
        res.status(500).json('Error deleting student: ' + error.message);
    }
};

module.exports = {
    getAll,
    getSingle,
    createStudent,
    updateStudent,
    deleteStudent,
};
