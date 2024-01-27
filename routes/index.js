const express = require('express');
const routes = require('express').Router();
const path = require('path');
const lesson1Controller = require('../controllers/lesson1');

routes.get('/', (req, res) => {
    //#Swagger.tags=['Hello World']
    res.send('Hello World');
});

routes.use('/frontend', express.static(path.join(__dirname, '..', 'frontend')));

routes.get('/jotham', lesson1Controller.jothamRoute);
routes.get('/jathniel', lesson1Controller.jathnielRoute);

// Include routes for 'users', 'students', and 'teachers'
const studentsRoutes = require('./students');
const teachersRoutes = require('./teachers');

// Use the respective paths for each collection
routes.use('/students', studentsRoutes);
routes.use('/teachers', teachersRoutes);

module.exports = routes;
