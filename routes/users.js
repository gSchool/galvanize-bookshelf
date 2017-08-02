'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex')
const bcrypt = require('bcrypt')

// YOUR CODE HERE

router.post('/users', (req, res, next) => {
  console.log(req.body.password);
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
    .first()
  })
  .then((userInfo) => {
    // console.log(userInfo);
    const resObj = {
      id: userInfo.id,
      firstName: userInfo.first_name,
      lastName: userInfo.last_name,
      email: userInfo.email
    }
    res.send(resObj)
  })
  .catch((err) => {
    next(err)
  })
})

module.exports = router;
