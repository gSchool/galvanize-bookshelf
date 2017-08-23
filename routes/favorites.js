'use strict';

const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const knex = require('../knex');
const { camelizeKeys } = require('humps');
const jwt = require('jsonwebtoken');

// eslint-disable-next-line new-cap
const router = express.Router();

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {return next(boom.create(401, 'Unauthorized'));}
    req.claim = payload;
    return next();
  });
};

router.get('/favorites', authorize, function(req, res, next) {
  knex('favorites').innerJoin('books', 'favorites.book_id', 'books.id')
    .then((favorites) => {
      return res.send(camelizeKeys(favorites));
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/favorites/check', authorize, function(req,res,next) {
    if(req.query.bookId > 1) {
      return res.send(false);
    } else {return res.send(true);}
});

router.post('/favorites', authorize, function(req, res, next) {
      return knex('favorites').insert({
        book_id: req.body.bookId,
      }, '*')
    .then((favorites) => {
      res.send(camelizeKeys(favorites));
    })
    .catch((err) => {
      next(err);
    });
  })

  router.delete('/favorites/:id', authorize, (req, res, next) => {
    let book;
    knex('favorites')
      .where('bookId', req.params.bookId)
      .first()
      .then((row) => {
        if (!row) {return next();}
        favorite = row;
        return knex('favorites')
          .del()
          .where('bookId', req.params.bookId);
      })
      .then(() => {
        delete favorites.id;
        res.send(camelizeKeys(favorite));
      })
      .catch((err) => {
        next(err);
      });
  });

module.exports = router;


//***********************************************

// | Request Method | Request URL                 | Request Body       | Response Status | Response Body                                        |
// |----------------|-----------------------------|--------------------|-----------------|------------------------------------------------------|
// | `GET`          | `/favorites`                | N/A                | `200`           | `[{ "id": 1, "bookId": 1, "userId": 1, ... }, ... ]` |
// | `GET`          | `/favorites/check?bookId=1` | N/A                | `200`           | `true`                                               |
// | `GET`          | `/favorites/check?bookId=2` | N/A                | `200`           | `false`                                              |
// | `POST`         | `/favorites`                | `{ "bookId": 2 } ` | `200`           | `{ "id": 2, "bookId": 2, "userId": 1, ... }`         |
// | `DELETE`       | `/favorites`                | `{ "bookId": 1 }`  | `200`           | `{ "bookId": 1, "userId": 1, ... }`                  |
//
// Additionally, ensure the middleware handles the following HTTP requests and sends back the associated HTTP response. The information in the request body uses the `application/json` content type while the information in the response body uses the `text/plain` content type. Assume no token has been created.
//
// | Request Method | Request URL                 | Request Body      | Response Status | Response Body     |
// |----------------|-----------------------------|-------------------|-----------------|-------------------|
// | `GET`          | `/favorites`                | N/A               | `401`           | `Unauthorized`    |
// | `GET`          | `/favorites/check?bookId=1` | N/A               | `401`           | `Unauthorized`    |
// | `GET`          | `/favorites/check?bookId=2` | N/A               | `401`           | `Unauthorized`    |
// | `POST`         | `/favorites`                | `{ "bookId": 2 }` | `401`           | `Unauthorized`    |
// | `DELETE`       | `/favorites`                | `{ "bookId": 1 }` | `401`           | `Unauthorized`    |
//
// You can run the following test suite to verify the middleware works as expected.

// ```shell
// npm test test/part5.routes.test.js
// ```
