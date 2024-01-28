const express = require('express');
const routes = require('express').Router();
const path = require('path');
const lesson1Controller = require('../controllers/lesson1');

routes.use('/', require('./swagger'));

// Default route
routes.get('/', (req, res) => {
    res.send('Hello World');
});

// Serve frontend files
routes.use('/frontend', express.static(path.join(__dirname, '..', 'frontend')));

// Additional routes for teachers and students
const studentsRoutes = require('./students');
const teachersRoutes = require('./teachers');

routes.use('/students', studentsRoutes);
routes.use('/teachers', teachersRoutes);

// Jotham and Jathniel routes
routes.get('/jotham', lesson1Controller.jothamRoute);
routes.get('/jathniel', lesson1Controller.jathnielRoute);

module.exports = routes;
