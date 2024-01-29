const express = require('express');
const routes = require('express').Router();
routes.use('/', require('./swagger'));
const path = require('path');
const lesson1Controller = require('../controllers/lesson1');

// Default route
routes.get('/', (req, res) => {
    res.send('Hello World');
});

// Serve frontend files
routes.use('/frontend', express.static(path.join(__dirname, '..', 'frontend')));

routes.get('/jotham', lesson1Controller.jothamRoute);
routes.get('/jathniel', lesson1Controller.jathnielRoute);
routes.use('/teachers', require('./teachers'));
routes.use('/students', require('./students'));


module.exports = routes;
