'use strict';

const express = require('express');
const knex = require('../knex');
const router = express.Router();
const { camelizeKeys, decamelizeKeys } = require('humps');
const bcrypt = require('bcrypt');

router.post('/users', (req, res, next) => {
  const pass = req.body.password
  bcrypt.hash(pass, 12)
    .then((result) => {
      return knex('users')
        .insert({
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          email: req.body.email,
          hashed_password: result
        }, '*');
    })
    .then((user) => {
      delete user[0].hashed_password;
      res.send(camelizeKeys(user[0]));
    })
    .catch((err) => {
      next(err);
    })

  // res.sendStatus(200);
})

module.exports = router
