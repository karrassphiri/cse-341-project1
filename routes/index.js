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

// Remove the following line, which includes the routes for 'users'
// routes.use('/users', require('./users'));

module.exports = routes;
