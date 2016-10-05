'use strict';

const express = require(`express`);

// eslint-disable-next-line new-cap
const router = express.Router();

// const boom = require('boom');
const knex = require(`../knex`);
const humps = require(`humps`);

router.get(`/`, (req, res, next) => {
  knex(`books`)
  .orderBy(`title`)
  .then((data) => { res.json(humps.camelizeKeys(data)); })
  .catch((err) => next(err));
});

router.get(`/:id`, (req, res, next) => {
  const id = req.params.id;
  knex(`books`)
  .where(`id`, id)
  .first()
  .then((data) => { res.json(humps.camelizeKeys(data)); })
  .catch((err) => next(err));
});

router.post(`/`, (req, res, next) => {
  knex(`books`)
  .insert(humps.decamelizeKeys(req.body), `id`)
  .then((num) => {
    const id = num[0];
    knex(`books`)
    .where(`id`, id)
    .first()
    .then((data) => { res.json(humps.camelizeKeys(data)); })
    .catch((e) => next(e));
  })
  .catch((err) => next(err));
});

// run the below command in bookshelf_test before every attempt to pass
// ALTER SEQUENCE books_id_seq RESTART WITH 9;
router.patch(`/:id`, (req, res, next) => {
  const id = req.params.id;
  knex(`books`)
  .where(`id`, id)
  .update(humps.decamelizeKeys(req.body))
  .then(() => {
    knex(`books`)
    .where(`id`, id)
    .first()
    .then((data) => { res.json(humps.camelizeKeys(data)); })
    .catch((e) => next(e));
  })
  .catch((err) => next(err));
});

router.delete(`/:id`, (req, res, next) => {
  const id = req.params.id;
  let book;
  knex(`books`)
  .select(`author`, `cover_url`, `description`, `genre`, `title`)
  .where(`id`, id)
  .first()
  .then((data) => {
    book = humps.camelizeKeys(data);
    knex(`books`)
    .where(`id`, id)
    .del()
    .then(() => { res.send(book); })
    .catch((e) => next(e));
  })
  .catch((err) => next(err));
});

module.exports = router;
