'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
const knex = require(`../knex`);
const humps = require(`humps`);

router.get(`/favorites`, (req, res, next) => {
  if (req.session.userId) {
    knex(`favorites`)
    .where(`user_id`, req.session.userId.id)
    .first()
    .then((results) => {
      knex(`books`)
      .where(`id`, results.book_id)
      .then((list) => {
        list.forEach((book) => {
          book.bookId = book.id;
          delete book.id;
        });
        res.json(humps.camelizeKeys(list));
      })
      .catch((err) => next(err));
    })
    .catch((err) => next(err));
  }
});

module.exports = router;
