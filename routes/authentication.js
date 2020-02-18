'use strict';

const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const User = require('./../models/user');

// SIGN IN ROUTERS
router.get('/sign-in', (req, res, next) => {
  res.render('authentication/sign-in');
});

router.post('/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  let user;
  if (username === '' || password === '') {
    res.render('authentication/sign-in', {
      errorMessage: 'Please enter both, username and password to sign in.'
    });
    return;
  }
  User.findOne({ username })
    .then(document => {
      user = document;
      if (!user) {
        res.render('authentication/sign-in', { errorMessage: "The username doesn't exist." });
      } else {
        if (!user) {
          next(new Error('user or password incorrect'));
        } else {
          return bcrypt.compare(password, user.passwordHash);
        }
      }
    })
    .then(match => {
      if (match) {
        req.session.user = user._id;
        res.redirect('/main');
      } else {
        res.render('authentication/sign-in', { errorMessage: 'Incorrect password' });
      }
    })
    .catch(() => {
      next(new Error('Not found'));
    });
});

// SIGN UP ROUTERS
router.get('/sign-up', (req, res, next) => {
  res.render('authentication/sign-up');
});

router.post('/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username: username }).then(user => {
    if (user !== null) {
      res.render('authentication/sign-up', {
        errorMessage: 'The username already exists!'
      });
      return;
    }
  });
  if (username === '' || password === '') {
    res.render('authentication/sign-up', {
      errorMessage: 'Indicate a username and a password to sign up'
    });
    return;
  } else {
    bcrypt
      .hash(password, 10)
      .then(passwordHash => {
        return User.create({
          username,
          passwordHash
        });
      })
      .then(user => {
        res.redirect('/');
      })
      .catch(() => {
        next(new Error('Not found'));
      });
  }
});

router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
