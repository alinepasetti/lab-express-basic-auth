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
  User.findById(id)
    .then(user => {
      res.render('profile', { user });
    })
    .catch(() => {
      next(new Error('Not found'));
    });
});

router.get('/profile/:id/edit', routeGuard, (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
    .then(user => {
      res.render('profileedit', { user });
      console.log({ user }, user);
    })
    .catch(() => {
      next(new Error('Not found'));
    });
});

router.post('/profile/:id/edit', routeGuard, (req, res, next) => {
  const id = req.params.id;
  const { username } = req.body;
  const data = {
    username
  };
  User.findByIdAndUpdate(id, data)
    .then(() => {
      res.redirect(`/profile/${id}`);
    })
    .catch(() => {
      next(new Error('Not found'));
    });
});

router.get('/main', routeGuard, (req, res, next) => {
  res.render('main');
});

module.exports = router;
