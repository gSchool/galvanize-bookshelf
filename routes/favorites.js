'use strict';

const express = require('express');
const errHandle = require('../errHandle.js');
const knex = require('../knex.js');
const jwt = require('jsonwebtoken');
const authorize = require('../authorize.js');
const {camelizeKeys, decamelizeKeys} = require('humps');

const router = express.Router();

router.get('/favorites', authorize, (req, res, next) => {
 knex('favorites')
  .innerJoin('books', 'books.id', 'favorites.book_id')
  .where('favorites.user_id', req.claim.userId)
  .then((faves) => {
    res.send(camelizeKeys(faves))
  })
  .catch((err) => {
    return next(err)
  })
})

router.get('/favorites/check', authorize, (req, res, next) => {
 knex('favorites')
  .innerJoin('books', 'books.id', 'favorites.book_id')
  .where('favorites.user_id', req.claim.userId)
  .where('books.id', req.query.bookId)
  .then((faves) => {
    res.send(!faves)
  })
  .catch((err) => {
    return next(err)
  })
})

router.post('')



module.exports = router;
