const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

//The get functions will be looked in the UsersContollers
//All these 5 routes will redirect to usersController which will go to controllers folder and will look for users.js
router.get('/', usersController.getAll);  
router.get('/:id', usersController.getSingle);

router.post('/', usersController.createUser);

router.put('/', usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;