'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex')
const bcrypt = require('bcrypt')


router.post('/users', (req, res, next) => {
  const pass = req.body.password;
  bcrypt.hash(pass, 12)
  .then((result) => {
    return knex('users')
      .insert({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        hashed_password: result
      }, '*')
  })
  .then((userInfo) => {
    const user = userInfo[0];
    const resObj = {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email
    }
    res.send(resObj)
  })
  .catch((err) => {
    next(err)
  })
})

module.exports = router;
