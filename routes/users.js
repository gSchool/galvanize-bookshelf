'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
// YOUR CODE HERE
const bcrypt = require('bcrypt-as-promised');

const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

router.post('/users', (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !email.trim()) {
    return next(boom.create(400, 'Email must not be blank'));
  }
  if (!password || password.length < 8) {
    return next(boom.create(400, 'Password must be at least 8 characters long'));
  }

  knex('users')
    .select(knex.raw('1=1'))
    .where('email', email)
    .first()
    .then((exists) => {
      if (exists) {
        throw boom.create(400, 'Email already exists');
      }
      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      const { firstName, lastName } = req.body;
      const insertUser = { firstName, lastName, email, hashedPassword };

      return knex('users').insert(decamelizeKeys(insertUser), '*');
    })
    .then((rows) => {
      const user = camelizeKeys(rows[0]);

      delete user.hashedPassword;
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
