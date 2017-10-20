const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const knex = require('../knex')
const jwt = require('jsonwebtoken')


router.get('/token', (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.send(false)
    } else {
      // res.status(200)
      // res.setHeader('content-type', 'application/json')
      res.send(true)
    }
  })
})

router.post('/token', (req, res, next) => {
// user login
  knex('users')
    // .select('id', 'email', 'hashed_password')
    .where('email', req.body.email)
    .first()
    .returning('*')
    .then((user) => {
      // console.log(user)
      if (user) {
        bcrypt.compare(req.body.password, user.hashed_password, (err, match) => {
          if (match) {
            const token = jwt.sign({
                userId: user.id,
            }, process.env.JWT_KEY)

            const newUser = {
              id: user.id,
              email: user.email,
              firstName: user.first_name,
              lastName: user.last_name
            }
            res.cookie('token', token, { httpOnly: true })
            res.send(newUser)
          } else if (!match) {
            res.status(400)
            res.setHeader('content-type', 'text/plain')
            res.send(`Bad email or password`)
          }
        })
      } else if (!user) {
        res.status(400)
        res.setHeader('content-type', 'text/plain')
        res.send(`Bad email or password`)
      }
    }).catch(err => next(err))
})

router.delete('/token', (req, res, next) => {
  res.clearCookie('token')
  res.sendStatus(200)
})



module.exports = router
