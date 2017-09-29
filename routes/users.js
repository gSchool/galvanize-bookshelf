'use strict'
const express = require('express');
const router = express.Router();
const knex = require('../knex')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

/* GET users listing. */
router.post('/users', (req, res, next) => {
  const { firstName, lastName, email, password } = req.body
  knex('users')
  .insert ({
    first_name: firstName,
    last_name: lastName,
    email,
    hashed_password: bcrypt.hashSync(password, salt)
  })
  .returning('*')
  .then((users) => {
    let user = {
      id: users[0].id,
      firstName: users[0].first_name,
      lastName: users[0].last_name,
      email: users[0].email,
    //  password: users[0].hashed_password
    }
    //console.log(password)
    res.json(user)
  })
    .catch((err) => {
      next(err)
    })
});


module.exports = router;
