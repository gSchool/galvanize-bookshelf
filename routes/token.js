'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex.js');
const errHandle = require('../errHandle.js');
const cookieParser = require('cookie-parser');


const router = express.Router();

router.get('/token', (req, res) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return res.send(false);
    }
    res.send(true);
  });
});

router.post('/token', (req, res, next) => {
  let user;
  if (!req.body.email || !req.body.email){
    throw errHandle(400, 'Email must not be blank')
  }
  if (!req.body.password || !req.body.password){
    throw errHandle(400, 'Password must not be blank')
  }
  knex('users')
    .where('email', req.body.email)
    .first()
    .then((row) => {
      if (!row){
        throw errHandle(400, 'Bad email or password')
      }
      user = row
      return bcrypt.compare(req.body.password, user.hashed_password)
    })
    .then(() => {
      const claim = {userId: user.id}
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '7 days'
      });
      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 640800000),
        secure: router.get('env') === 'production'
    })
    delete user.hashed_password;
    res.send({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      email: user.email
    });
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      throw errHandle(400, 'Bad email or password')
    })
    .catch((err) => {
      next(err)
    })
})

router.delete('/token', (req, res) => {
  res.clearCookie('token');
  res.end();
});

module.exports = router;
