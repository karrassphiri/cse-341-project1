const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher'); // adjust to your actual controller name

router.get('/', teacherController.getAll);
router.get('/:id', teacherController.getSingle);
router.post('/', teacherController.createTeacher);
router.put('/:id', teacherController.updateTeacher);
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;
