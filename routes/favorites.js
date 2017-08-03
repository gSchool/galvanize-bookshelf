'use strict';

const express = require('express');
const humps = require('humps');
const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
// eslint-disable-next-line new-cap
const knex = require('../knex');
const router = express.Router();

// YOUR CODE HERE
const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }
    req.claim = payload;
    return next();
  });
};

router.get('/favorites', authorize, (req, res, next) => {
  if (typeof req.claim.userId !== 'number') {
    return next(boom.create(400, 'Book ID must be an integer'));
  }
  knex('favorites')
    .where('favorites.user_id', req.claim.userId)
    .innerJoin('books', 'favorites.book_id', 'books.id')
    .then((favorites) => {
      return res.send(humps.camelizeKeys(favorites));
    })
    .catch((err) => {
      next(err);
    })
});

router.get('/favorites/check', authorize, (req, res, next) => {
  const id = parseInt(req.query.bookId);
  if (Number.isNaN(id)) {
    return next(boom.create(400, 'Book ID must be an integer'));
  }
  knex('favorites')
    .innerJoin('books', 'favorites.book_id', 'books.id')
    .where('books.id', id)
    .andWhere('favorites.user_id', req.claim.userId)
    .then((favorites) => {
      if (favorites.length === 0) {
        return res.send(false);
      }
      return res.send(true);
    })
    .catch((err) => {
      next(err);
    })
});

router.post('/favorites', authorize, (req, res, next) => {
  if (typeof req.body.bookId !== 'number') {
    return next(boom.create(400, 'Book ID must be an integer'));
  }
  const favorite = {'user_id': req.claim.userId, 'book_id': req.body.bookId, 'created_at': knex.fn.now(), 'updated_at': knex.fn.now()};
  knex('favorites')
    .insert(favorite)
    .returning('*')
    .then((newFavorite) => {
      return res.send(humps.camelizeKeys(newFavorite[0]));
    })
    .catch((err) => {
      next(err);
    })
});

router.delete('/favorites', authorize, (req, res, next) => {
  const userId = req.claim.userId;
  const bookId = req.body.bookId;
  let toRemove;
  knex('favorites')
    .where('user_id', userId)
    .andWhere('book_id', bookId)
    .then((favorite) => {
      if (!favorite) {
        return next(errorize('Not Found', 404));
      }
      toRemove = favorite[0];
      return knex('favorites')
        .del()
        .where('favorites.id', toRemove.id);
    })
    .then((data) => {
      delete toRemove.id;
      res.send(humps.camelizeKeys(toRemove));
    })
    .catch((err) => {
      next(err);
    })
});

module.exports = router;
