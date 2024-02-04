const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');
//const validate = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', studentsController.getAll);
router.get('/:id', studentsController.getSingle);

//router.post('/', validate.saveStudent, studentsController.createStudent);
//router.put('/:id', validate.saveStudent, studentsController.updateStudent);
//router.delete('/:id', studentsController.deleteStudent);

//The routes below are using OATH to authorize the user
router.post('/', isAuthenticated, studentsController.createStudent);
router.put('/:id', isAuthenticated, studentsController.updateStudent);
router.delete('/:id', isAuthenticated, studentsController.deleteStudent);
module.exports = router;
