'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex.js');


// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/token', (req, res, next) => {
  knex('users')
    
})

module.exports = router;
