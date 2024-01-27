const { response } = require('express');
const mongodb = require('../data/database'); //This import calls the Mongodb database
const ObjectId = require('mongodb').ObjectId; // this is the primary key that Mongo assigns


const getAll = async (req, res) => {
        //#swagger.tags=['Users']
    try {
        const result = await mongodb.getDb().collection('users').find().toArray(); 
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json('Error getting users: ' + error.message);
    }
};

const getSingle = (req, res) => {
    //#swagger.tags=['Users']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid student id to find student');
        return; 
    }
    const studentId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .collection('students')
        .find({ _id: studentId })
        .toArray((err, result) => {
            if (err) {
                res.status(400).json({ message: err });
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(result[0]);
            }
        });
};

//This is the create user function
const createUser = async (req, res) => {
    //#swagger.tagss=['Users']
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    try {
        const response = await mongodb.getDb().collection('users').insertOne(user);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the user.');
        }
    } catch (error) {
        res.status(500).json('Error creating user: ' + error.message);
    }
};


//This is the update user function
const updateUser = async (req, res) => {
    //#swagger.tagss=['Users']
    const userId = new ObjectId(req.params.id);
    const updatedUser = {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        }
    };

    try {
        const response = await mongodb.getDb().collection('users').updateOne({ _id: userId }, updatedUser);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json('Error updating user: ' + error.message);
    }
};


//This is the delete user function
const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']

    const userId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDb().collection('users').deleteOne({ _id: userId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json('Error deleting user: ' + error.message);
    }
};


module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser,
};
