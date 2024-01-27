const { response } = require('express');
const mongodb = require('../data/database'); //This import calls the Mongodb database
const ObjectId = require('mongodb').ObjectId; // this is the primary key that Mongo assigns

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().collection('teachers').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json('Error getting students: ' + error.message);
    }
};

const getSingle = (req, res) => {
    //#swagger.tags=['Users']
    const teacherId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db()
      .collection('teachers')
      .find({ _id: teacherId })
      .toArray((err, result) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
      });
  };

const createTeacher = async (req, res) => {
    const teacher = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        contactNumber: req.body.contactNumber,
        gender: req.body.gender  
    };

    try {
        const response = await mongodb.getDb().collection('teachers').insertOne(teacher);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the teacher.');
        }
    } catch (error) {
        res.status(500).json('Error creating teacher: ' + error.message);
    }
};

//This is the update teacher function
const updateTeacher = async (req, res) => {
    //#swagger.tagss=['Users']
    const teacherId = new ObjectId(req.params.id);
    const updatedTeacher = {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            contactNumber: req.body.contactNumber,
            gender: req.body.gender  
         }
    };

    try {
        const response = await mongodb.getDb().collection('teachers').updateOne({ _id: teacherId }, updatedTeacher);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'teacher not found' });
        }
    } catch (error) {
        res.status(500).json('Error updating teacher: ' + error.message);
    }
};


//This is the delete student function
const deleteTeacher = async (req, res) => {
    //#swagger.tags=['Users']

    const teacherId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDb().collection('teachers').deleteOne({ _id: teacherId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'teacher not found' });
        }
    } catch (error) {
        res.status(500).json('Error deleting teacher: ' + error.message);
    }
};

module.exports = {
    getAll,
    getSingle,
    createTeacher,
    updateTeacher,
    deleteTeacher,
};
