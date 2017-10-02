'use strict';

const express = require('express')
// eslint-disable-next-line new-cap
const router = express.Router()
const knex = require ('../knex')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const SECRET = "mySecret"



/* GET users listing. */
router.get('/token', function(req, res, next) {
  jwt.verify(req.cookies.token, SECRET, (err, payload) => {
    if(err) {
      res.send(false)
    } else {
      res.send(true)
    }
  })
})

router.post('/token', function(req, res, next){
  if(!req.body.email || !req.body.password) res.sendStatus(400)
  knex('users')
  .where({
    email: req.body.email
  }, '*')
  .first()
  .then((data) => {
    if(!data){
      res.status(400)
      res.setHeader('Content-Type', 'text/plain')
      res.send('Bad email or password')
    } else if (bcrypt.compareSync(req.body.password, data.hashed_password)){
      let token = jwt.sign({id:data.id}, SECRET)
      res.cookie('token', token, {httpOnly:true})
      res.send({
          id: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email})
    } else {
      res.status(400)
      res.setHeader('Content-Type', 'text/plain')
      res.send('Bad email or password')
    }
  })
  .catch(next)
})

router.delete ('/token', (req, res, next) => {
  res.clearCookie('token', {path: '/token'})
  res.send()
})
module.exports = router;
