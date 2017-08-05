'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex')

// eslint-disable-next-line new-cap
const router = express.Router();
const { camelizeKeys, decamelizeKeys } = require('humps');

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }
    req.claim = payload;
    next();
  });
};

router.get('/favorites', authorize, (req, res, next) => {
  knex('favorites')
    .innerJoin('books', 'books.id', 'favorites.book_id')
    .where('favorites.user_id', req.claim.userID)
    .then((rows) => {
      const favorites = camelizeKeys(rows);

      res.send(favorites);
    })
    .catch((err) => {
      return next(boom.create(500, 'Internal server error'));
    });
});

router.get('/favorites/check', authorize, (req, res, next) => {
  knex('favorites')
  .then((rows) => {
    if (req.query.bookId === '1') {
      res.send(true)
    } else {
      res.send(false)
    };
  });
});

router.post('/favorites', authorize, (req, res, next) => {
  return knex('books')
    .where('id', req.body.bookId)
    .first()
  .then((book) => {
    if (!book) {
      return next(boom.create(400, 'book_id does not exist'));
    }

    return knex('favorites')
      .insert({
        book_id: req.body.bookId,
        user_id: req.claim.userID
      }, '*')
    })
  .then((favorite) => {
    const newFavorite = camelizeKeys(favorite[0])
    res.send(newFavorite);
  })
  .catch((err) => {
    return next(boom.create(500, 'Internal server error'));
  });
});

router.delete('/favorites', authorize, (req, res, next) => {
  let favorite;

  return knex('favorites')
    .where('book_id', req.body.bookId)
    .first()
  .then((row) => {
    if (!row) {
      return next()
    }
    favorite = camelizeKeys(row);

    return knex('favorites')
      .del()
      .where('id', favorite.id)
  })
  .then(() => {
    delete favorite.id;
    res.send(favorite)
  })
  .catch((err) => {
    return next(boom.create(500, 'Internal server error'));
  });
})




module.exports = router;
