'use strict';

const express = require('express');
const knex = require('../knex');

// eslint-disable-next-line new-cap
const router = express.Router();
const { camelizeKeys, decamelizeKeys } = require('humps');

router.get('/books', (_req, res, next) => {
  knex('books')
    .orderBy('title')
    .then((books) => {
      res.send(camelizeKeys(books));
    })
    .catch((err) => {
      next(err)
    });
});

router.get('/books/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id);

  if (Number.isNaN(id) || id < 0) {
    return next({
      statusCode: 404,
      message: "Not Found"
    });
  };

  knex('books')
    .where('id', id)
    .first()
    .then((book) => {
      if (!book) {
        return next()
      }
      res.send(camelizeKeys(book))
    })

    .catch((err) => {
      next(err)
    })
})

router.post('/books', (req, res, next) => {
  if (!req.body.title) {
    return next({
      statusCode: 400,
      message: 'Title must not be blank'
    });
  };

  if (!req.body.author) {
    return next({
      statusCode: 400,
      message: 'Author must not be blank'
    });
  };

  if (!req.body.genre) {
    return next({
      statusCode: 400,
      message: 'Genre must not be blank'
    });
  };

  if (!req.body.description) {
    return next({
      statusCode: 400,
      message: 'Description must not be blank'
    });
  };

  if (!req.body.coverUrl) {
    return next({
      statusCode: 400,
      message: 'Cover URL must not be blank'
    });
  };

  knex('books')
    .insert({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      description: req.body.description,
      cover_url: req.body.coverUrl
    }, '*')
    .then((book) => {
      res.send(camelizeKeys(book[0]))
    })
    .catch((err) => {
      next(err)
    })
})

router.patch('/books/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id)

  if (Number.isNaN(id) || id < 0) {
    return next({
      statusCode: 404,
      message: "Not Found"
    })
  };

  knex('books')
    .where('id', id)
    .first()
    .then((book) => {
      if (!book) {
        return next({
          statusCode: 404,
          message: 'Not Found'
        })
      }
      return knex('books')
        .where('id', id)
        .update({
          title: req.body.title,
          author: req.body.author,
          genre: req.body.genre,
          description: req.body.description,
          cover_url: req.body.coverUrl
        }, '*')
    })
    .then((book) => {
      res.send(camelizeKeys(book[0]))
    })
    .catch((err) => {
      next(err)
    })
})

router.delete('/books/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id)

  if (Number.isNaN(id) || id < 0) {
    return next({
      statusCode: 404,
      message: "Not Found"
    })
  }

  let deletedBook;

  knex('books')
    .where('id', id)
    .first()
    .then((book) => {
      if (!book) {
        return next({
          statusCode: 404,
          message: 'Not Found'
        })
      }

      deletedBook = book;

      return knex('books')
        .del()
        .where('id', id)
    })
    .then(() => {
      delete deletedBook.id;
      res.send(camelizeKeys(deletedBook))
    })
    .catch((err) => {
      return next(err)
    });
});

module.exports = router;
