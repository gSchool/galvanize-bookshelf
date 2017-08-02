'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex.js');
const errHandle = require('../errHandle.js')


// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/token', (req, res) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return res.send(false);
    }

    res.send(true);
  });
});

router.delete('/token', (req, res) => {
  res.clearCookie('token');
  res.end();
});

module.exports = router;
