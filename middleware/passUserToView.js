'use strict';

const passUserToViews = (req, res, next) => {
  res.locals.user = req.user;
  console.log(res.locals.user);
  next();
};

module.exports = passUserToViews;
