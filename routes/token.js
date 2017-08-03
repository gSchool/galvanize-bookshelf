'use strict';

const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/token', (req, res, next) => {
//find out whether the user's email is in a database; if so check whether password is correct
  let user;

  knex('users')
    .where('email', req.body.email)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(400, 'Bad request');
      }

      user = camelizeKeys(row)

      return bcrypt.compare(req.body.password, user.hashedPassword);
    })
    //if password is valid, then make up a token and a cookie
    .then(() => {
      const claim = {userID: user.id};
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '7 days'
      });
      //add token to a cookie-parser
      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        secure: router.get('env') === 'production'
      });

      //send user info back to client, minus the password hash
      delete user.hashedPassword
      res.send(user);
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      throw boom.create(400, 'Bad email or password');
    })
    .catch((err) => {
      next({
        statusCode: 400, 
        message: "Bad email or password"
      })
    });
})

//when a req comes in with a jwt, check it
router.get('/token', (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return res.send(false)
    }
    res.send(true);
  });
});

//delete a token to deauthorize a cookie
router.delete('/token', (req, res) => {
  res.clearCookie('token');
  res.end();
});

module.exports = router;
