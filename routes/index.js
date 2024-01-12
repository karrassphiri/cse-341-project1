
const express = require('express');
const path = require('path');
const lesson1Controller = require('../controllers/lesson1');

const router = express.Router();

router.use(express.static(path.join(__dirname, '..', 'public')));

router.get('/', lesson1Controller.getRoot);

router.get('/florence', lesson1Controller.getFlorence);

module.exports = router;
