'use strict';

const express = require('express');
// eslint-disable-next-line new-cap
const knex = require('../knex');
const router = express.Router();
const humps = require('humps')


router.get('/books', (req, res, next) => {

  knex('books')
  .orderBy('title')
  .then((books) => {
  var camel = humps.camelizeKeys(books)
    res.json(camel)
  })
  .catch((err) => {
    next(err)
  })

})
router.get('/books/:id', (req, res, next) => {
  knex('books')
  .where('id', req.params.id)
  .then((books) => {
    var camel = humps.camelizeKeys(books[0])

    res.json(camel)
  })
  .catch((err) => {
    next(err)
  })
})

module.exports = router;
