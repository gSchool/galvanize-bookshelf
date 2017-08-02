'use strict';

const bcrypt = require('bcrypt');
const express = require('express');
const knex = require('../knex.js');
// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
router.post('/users', (req, res, next) => {
  const{firstName, lastName, email, password} = req.body
  const hashed_password = bcrypt.hash(password, 12)
  return knex("user")
      .insert({
        'first_name': firstName,
        'last_name': lastName,
        'email': email,
        'hashed_password': hashed_password
      }, '*')

      .then((user) => {
        res.send(user[0])
      })
      .catch ((err) => {
        return next(err)
      })
})


module.exports = router;
