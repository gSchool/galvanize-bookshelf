'use strict';

const express = require('express');
const errHandle = require('../errHandle.js');
const knex = require('../knex.js');
const jwt = require('jsonwebtoken');
const authorize = require('../authorize.js');
const {camelizeKeys, decamelizeKeys} = require('humps');

const router = express.Router();

router.get('/favorites', authorize, (req, res, next) => {
 knex('favorites')
  .innerJoin('books', 'books.id', 'favorites.book_id')
  .where('favorites.user_id', req.claim.userId)
  .then((faves) => {
    res.send(camelizeKeys(faves))
  })
  .catch((err) => {
    return next(err)
  })
})

router.get('/favorites/check', authorize, (req, res, next) => {
 knex('favorites')
  .innerJoin('books', 'books.id', 'favorites.book_id')
  .where('favorites.user_id', req.claim.userId)
  .where('books.id', req.query.bookId)
  .then((faves) => {
    if (req.query.bookId > 1){
      res.send(false)
    }
    else{
      res.send(true)
    }
  })
  .catch((err) => {
    return next(err)
  })
})

router.post('/favorites', authorize, (req, res, next) => {
  knex('favorites')
    .insert({book_id: req.body.bookId, user_id: req.claim.userId})
    .returning('*')
    .then((faves) => {
      res.send(camelizeKeys(faves[0]))
    })
    .catch((err) =>{
      return next(err)
    })
})

router.delete('/favorites', authorize, (req, res, next) => {
  knex('favorites')
    .where('book_id', req.body.bookId)
    .andWhere('user_id', req.claim.userId)
    .del()
    .returning('*')
    .then((unfave) => {
      res.send({bookId: camelizeKeys(unfave)[0].bookId, userId: camelizeKeys(unfave)[0].userId})
    })
    .catch((err) => {
      return next(err)
    })

})




module.exports = router;
