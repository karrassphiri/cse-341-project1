const routes = require('express').Router();

const lesson1Controller = require('../controllers/lesson1');

routes.get('/', lesson1Controller.florenceRoute);
routes.get('/jotham', lesson1Controller.jothamRoute);
routes.get('/jathniel', lesson1Controller.jathnielRoute);

module.exports = routes;
