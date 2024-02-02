const express = require('express');
const routes = require('express').Router();
routes.use('/', require('./swagger'));
const path = require('path');

// Default route
routes.get('/', (req, res) => {
    res.send('Hello World');
});

// Serve frontend files
routes.use('/frontend', express.static(path.join(__dirname, '..', 'frontend')));

// Removed routes related to 'jotham' and 'jathniel'
// routes.get('/jotham', lesson1Controller.jothamRoute);
// routes.get('/jathniel', lesson1Controller.jathnielRoute);

routes.use('/teachers', require('./teachers'));
routes.use('/students', require('./students'));

module.exports = routes;
