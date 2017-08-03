'use strict';

const bcrypt = require('bcrypt');
const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

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
    .where('favorites.user_id', req.claim.userId)
    .then((rows) => {
      const favorites = camelizeKeys(rows);

      res.send(favorites);
    })
    .catch((err) => {
      next(err);
    });
});


router.get('/favorites/check', authorize, (req, res, next) => {
  knex('favorites')
    .where('favorites.book_id', req.query.bookId)
    .andWhere('favorites.user_id', req.claim.userId)
    .then((row) => {
      if (row.length) {
        res.send(true)
      } else {
        res.send(false);
      }
    })
    .catch((err) => {
      next(err);
    });
});


router.post('/favorites', authorize, (req, res, next) => {
  const postObj = {
    user_id: req.claim.userId,
    book_id: req.body.bookId,
  }
  knex('favorites')
    .insert( postObj )
    .returning('*')
    .then((favorite) => {
      res.send(camelizeKeys(favorite[0]));
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/favorites', authorize, (req, res, next) => {
  knex('favorites')
    .del()
    .where('book_id', req.body.bookId)
    .andWhere('user_id', req.claim.userId)
    .then(() => {
      const delObj = {
        bookId: req.body.bookId,
        userId: req.claim.userId
      }

      res.send(delObj);
    })
    .catch((err) => {
      next(err);
    });
});




module.exports = router;
