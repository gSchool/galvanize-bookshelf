/* eslint-disable camelcase */
'use strict';

const express = require(`express`);
// const validator = require(`express-validation`);
// const validation = require(`../validations/rules.js`);

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
const knex = require(`../knex`);
const humps = require(`humps`);
const boom = require(`boom`);

router.get(`/check`, (req, res, next) => {
  if (req.session.userId) {
    knex(`favorites`)
    .where(`user_id`, req.session.userId.id)
    .where(`book_id`, req.query.bookId)
    .then((match) => {
      if (match.length > 0) { res.json(true); }
      else { res.json(false); }
    })
    .catch((err) => next(err));
  }
  else { throw boom.create(401, `Unauthorized`); }
});

router.get(`/`, (req, res, next) => {
  if (req.session.userId) {
    knex(`favorites`)
    .innerJoin(`books`, `favorites.book_id`, `books.id`)
    .where(`user_id`, req.session.userId.id)
    .then((favs) => { res.json(humps.camelizeKeys(favs)); })
    .catch((err) => next(err));
  }
  else { throw boom.create(401, `Unauthorized`); }
});

router.post(`/`, (req, res, next) => {
  if (req.session.userId) {
    knex(`favorites`)
    .insert({
      book_id: req.body.bookId,
      user_id: req.session.userId.id
    }, [`id`, `book_id`, `user_id`])
    .then((result) => res.json(humps.camelizeKeys(result[0])))
    .catch((err) => next(err));
  }
  else { throw boom.create(401, `Unauthorized`); }
});

router.delete(`/`, (req, res, next) => {
  if (req.session.userId) {
    knex(`favorites`)
    .where(`user_id`, req.session.userId.id)
    .where(`book_id`, req.body.bookId)
    .del()
    .then(() => res.json({
      bookId: req.body.bookId,
      userId: req.session.userId.id
    }))
    .catch((err) => next(err));
  }
  else { throw boom.create(401, `Unauthorized`); }
});

module.exports = router;
