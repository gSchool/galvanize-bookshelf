'use strict';

const express = require('express');
const knex = require('../knex')

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
router.get('/books', (req, res) => {
    knex('books')
        .orderBy('title')
        .then((bookRes) => {
            res.json(bookRes);
        })
        .catch((err) => {
            next(err);
        })
});

router.get('/books/:id', (req, res) => {
    knex('books')
        .where('id', req.params.id)
        .first()
        .then((book) => {
          if(!book) {
            return next();
          }
            res.json(book);
        })
        .catch((err) => {
            next(err);
        })
});






module.exports = router;
