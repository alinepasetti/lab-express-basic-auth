'use strict';

const User = require('./../models/user');

const deserializeUser = (req, res, next) => {
  const userId = req.session.user;
  if (userId) {
    User.findById(userId)
      .then(user => {
        if (!user) {
          delete req.session.user;
        } else {
          req.user = user;
        }
        next();
      })
      .catch(error => {
        next(error);
      });
  } else {
    next();
  }
};

module.exports = deserializeUser;
