const express = require('express');
const passport = require('passport');
const routes = require('express').Router();
routes.use('/', require('./swagger'));
const path = require('path');
const router = require('./swagger');

// Default route
routes.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if(err) {return next(err);}
        res.redirect('/');
    });
});
// Serve frontend files
routes.use('/frontend', express.static(path.join(__dirname, '..', 'frontend')));

routes.use('/teachers', require('./teachers'));
routes.use('/students', require('./students'));

module.exports = routes;
