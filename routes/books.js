'use strict';


const express = require('express');
// eslint-disable-next-line new-cap

const humps = require('humps');
const router = express.Router();
const knex = require('../knex.js');

router.get('/books', (req, res, next) => {
  knex('books').orderBy('title', 'ASC')
    .then((data) => {
      const books = humps.camelizeKeys(data);
      res.send(books);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/books/:id', (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return next(errorize('Not Found', 404));
  }
  knex('books').where('id', id)
    .first()
    .then((book) => {
      if (!book) {
        return next(errorize('Not Found', 404));
      }
      book = humps.camelizeKeys(book);
      res.send(book);
    })
    .catch((err) => {
      next(err);
    });
});
// YOUR CODE HERE

router.post('/books', (req, res, next) => {
  const book = humps.decamelizeKeys(req.body);
  if (!book.title) {
    next(errorize('Title must not be blank', 400));
  } else if (!book.author) {
    next(errorize('Author must not be blank', 400));
  } else if (!book.genre) {
    next(errorize('Genre must not be blank', 400));
  } else if (!book.description) {
    next(errorize('Description must not be blank', 400));
  } else if (!book.cover_url) {
    next(errorize('Cover URL must not be blank', 400));
  }
  knex('books')
    .insert(book)
    .returning('*')
    .then((result) => {
      res.send(humps.camelizeKeys(result[0]));
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/books/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const changes = humps.decamelizeKeys(req.body);
  if (isNaN(id)) {
    return next(errorize('Not Found', 404));
  }
  if (!Object.keys(changes).length) {
    return next(errorize('Not Found', 404));
  }
  knex('books')
    .where('id', id)
    .update(changes)
    .returning(['id', 'title', 'author', 'genre', 'description', 'cover_url'])
    .then((book) => {
      if (!book.length) {
        return next(errorize('Not Found', 404));
      }
      res.send(humps.camelizeKeys(book[0]));
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/books/:id', (req, res, next) => {
  let toDelete;
  if (isNaN(req.params.id)) {
    next(errorize('Not Found', 404));
  }
  knex('books')
    .where('id', req.params.id)
    .first()
    .then((book) => {
      if (!book) {
        return next(errorize('Not Found', 404));
      }
      toDelete = book;
      return knex('books')
        .del()
        .where('id', req.params.id)
    })
    .then((result) => {
      delete toDelete.id;
      delete toDelete.updated_at;
      delete toDelete.created_at;
      res.send(humps.camelizeKeys(toDelete));
    })
    .catch((err) => {
      next(err);
    });
});

const errorize = function(message, code) {
  let error = {};
  error.message = message;
  error.output = {};
  error.output.statusCode = code;
  return error;
}

module.exports = router;
