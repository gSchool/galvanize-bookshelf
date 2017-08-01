'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const knex = require('../knex');
const humps = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
router.post('/users', (req, res, next) => {
  let user = req.body;
  const password = req.body.password;
  delete user.password;
  user = humps.decamelizeKeys(user);
  bcrypt.hash(password, 12)
    .then((hashed) => {
      user['hashed_password'] = hashed;
      return knex('users')
        .insert(user, '*')
    })
    .then((result) => {
      result = result[0];
      delete result.hashed_password;
      result = humps.camelizeKeys(result);
      res.send(result);
    })
    .catch((err) => {
      return next(err);
    })
});

module.exports = router;
