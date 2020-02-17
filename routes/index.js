'use strict';

const { Router } = require('express');
const router = Router();
const routeGuard = require('./../middleware/routeGuard');
const User = require('./../models/user');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

router.get('/profile/:id', routeGuard, (req, res, next) => {
  const id = req.params.id;
  User.findById(id).then(user => {
    res.render('profile', { user });
  });
});

router.get('/main', routeGuard, (req, res, next) => {
  res.render('main');
});

module.exports = router;
