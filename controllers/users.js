const { response } = require('express');
const mongodb = require('../data/database'); //This import calls the Mongodb database
const ObjectId = require('mongodb').ObjectId; // this is the primary key that Mongo assigns


const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id); //First get the user (which is the object Id) Id which is the obejct that was passed above
    const result = await mongodb.getDb().db().collection('users').find({ _id: userId }).toArray();   
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
};

//This is the create user function
const createUser = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db.collection('users').InsertOne(user);
    if (response.acknowledge) {
       res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the user.' );
    }
};

//This is the update user function
const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db.collection('users').replaceOne({ _id: userId}, user);
    if (response.modifiedCount > 0) {
       res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the user.' );
    }
};

//This is the delete user function
const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db.collection('users').remove({ _id: userId}, user);
    if (response.deleteCount > 0) {
       res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the user.' );
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser,

};
