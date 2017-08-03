'use strict';

const express = require('express');
const knex = require('../knex');
// eslint-disable-next-line new-cap
const router = express.Router();
const humps = require('humps');
const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');

router.get('/token', (req, res) => {


  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {

    if (err) {

      return res.send(false);
    }
    res.send(true);
  });
});


router.post('/token', (req, res, next) => {
  let user;
  const username = req.body.email;
  const password = req.body.password;
  if (!username || !password || !username.trim() || !password.trim()) {
    return next({statusCode: 400});
  }
  knex('users').where('email', username).first()
    .then((row) => {
      if(!row) {
        throw boom.create(400, 'Bad email or password');
      }
      user = humps.camelizeKeys(row);
      return bcrypt.compare(password, user.hashedPassword);
    })
    //if hashed password matches give them a cookie
    .then(() => {
      const claim = { userId: user.id};
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '7 days'
      });
      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), //7 days
        secure: router.get('env') === 'production'
      });
      delete user.hashedPassword;
      res.send(user);
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      throw boom.create(400, 'Bad email or password');
    })
    .catch((err) => {
      return next(err);
    })
});

router.delete('/token', (req, res, next) => {
  res.clearCookie('token');
  res.end();
});
// YOUR CODE HERE

module.exports = router;
