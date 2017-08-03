'use strict'
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const errHandle = require('./errHandle.js');


module.exports = (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err){
      return next(errHandle(401, "Unauthorized"));
    }
    req.claim = payload;

    next();
  })
}
