const express = require('express'); //added for frontend

const routes = require('express').Router();
routes.use('/', require('./swagger'));

const path = require('path'); //added for frontend
const lesson1Controller = require('../controllers/lesson1');

//routes.get('/', lesson1Controller.florenceRoute);
routes.get('/', (req, res) => {
    //#Swagger.tags=['Hello World']
    res.send('Hello World');
})
routes.use('/frontend', express.static(path.join(__dirname, '..', 'frontend'))); //added for frontend
routes.get('/jotham', lesson1Controller.jothamRoute);
routes.get('/jathniel', lesson1Controller.jathnielRoute);
routes.use('/users', require('./users'));


module.exports = routes;
