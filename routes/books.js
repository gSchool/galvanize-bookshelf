'use strict';

const express = require(`express`);

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
// const boom = require('boom');
const knex = require(`../knex`);
const humps = require(`humps`);

router.get(`/books`, (req, res) => {
  knex(`books`).orderBy(`title`).then((data) => {
    res.json(humps.camelizeKeys(data));
  });
});

router.get(`/books/:id`, (req, res) => {
  const id = req.params.id;
  knex(`books`).where(`id`, id).first().then((data) => {
    res.json(humps.camelizeKeys(data));
  });
});

router.post(`/books`, (req, res) => {
  knex(`books`).insert(humps.decamelizeKeys(req.body), `id`).then((num) => {
    const id = num[0];
    knex(`books`).where(`id`, id).first().then((data) => {
      res.json(humps.camelizeKeys(data));
    });
  });
});

// run the below command in bookshelf_test before every attempt to pass
// ALTER SEQUENCE books_id_seq RESTART WITH 9;
router.patch(`/books/:id`, (req, res) => {
  const id = req.params.id;
  knex(`books`).where(`id`, id).update(humps.decamelizeKeys(req.body)).then(() => {
    knex(`books`).where(`id`, id).first().then((data) => {
      res.json(humps.camelizeKeys(data));
    });
  });
});

router.delete(`/books/:id`, (req, res) => {
  const id = req.params.id;
  let book;
  knex(`books`).select(`author`, `cover_url`, `description`, `genre`, `title`)
  .where(`id`, id).first().then((data) => {
    book = humps.camelizeKeys(data);
    knex(`books`).where(`id`, id).del().then(() => {
      res.send(book);
    });
  });
});

module.exports = router;
