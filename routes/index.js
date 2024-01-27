const express = require('express');
const router = express.Router();
const path = require('path');
const lesson1Controller = require('../controllers/lesson1');
router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#Swagger.tags=['Hello World']
    res.send('Hello World');
});

router.use('/frontend', express.static(path.join(__dirname, '..', 'frontend')));

router.get('/jotham', lesson1Controller.jothamRoute);
router.get('/jathniel', lesson1Controller.jathnielRoute);

const studentsRoutes = require('./students');
const teachersRoutes = require('./teachers');

router.use('/students', studentsRoutes);
router.use('/teachers', teachersRoutes);

module.exports = router;
