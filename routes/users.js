'use strict';

const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const knex = require('../knex.js');
// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
router.post('/users', (req, res, next) => {
  const{firstName, lastName, email, password} = req.body
  bcrypt.hash(password, 12).then((hashedPassword) =>{
    return knex("users")
    .insert({
      'first_name': firstName,
      'last_name': lastName,
      'email': email,
      'hashed_password': hashedPassword
    }, '*')
  })
      // .returning('id', 'first_name as firstName', 'last_name as lastName', 'email')

      .then((user) => {
        return res.send({
          id: user[0].id,
          firstName: user[0].first_name,
          lastName: user[0].last_name,
          email: user[0].email
        })
      })
      .catch ((err) => {
        return next(err)
      })
})


module.exports = router;
