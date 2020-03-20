const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const knex = require('../knex')

router.post('/users', (req, res, next) => {
  bcrypt.hash(req.body.password, 12)
    .then((hash) => {
      return knex('users')
        .insert({
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          email: req.body.email,
          hashed_password: hash
        }, '*')
    })

    .then((user) => {
      let added = {
        id: user[0].id,
        firstName: user[0].first_name,
        lastName: user[0].last_name,
        email: user[0].email,
      }
      res.json(added)
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
