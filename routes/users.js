'use strict';

const express = require('express')
const knex = require('../knex')
const bcrypt = require('bcrypt')
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/users', (req, res, next) => {
  bcrypt.hash(req.body.password, 12)
    .then((hashed_password) => {
      return knex('users').insert({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        hashed_password: hashed_password
      }, '*');
      res.sendStatus(200);
    })
    .then((user) => {
      delete user[0].hashed_password;
      res.send(camelizeKeys(user[0]));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
