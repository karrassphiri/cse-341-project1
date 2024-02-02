const express = require('express');
const router = express.Router();
const teachersController = require('../controllers/teachers');
const validate = require('../middleware/validate');

router.get('/', teachersController.getAll);
router.get('/:id', teachersController.getSingle);
router.post('/', validate.saveTeacher, teachersController.createTeacher);
router.put('/:id', validate.saveTeacher, teachersController.updateTeacher);
router.delete('/:id', teachersController.deleteTeacher);

module.exports = router;
