const express = require('express');
const router = express.Router();
const teachersController = require('../controllers/teachers'); // adjust to your actual controller name

router.get('/', teachersController.getAll);
router.get('/:id', teachersController.getSingle);
router.post('/', teachersController.createTeacher);
router.put('/:id', teachersController.updateTeacher);
router.delete('/:id', teachersController.deleteTeacher);

module.exports = router;
