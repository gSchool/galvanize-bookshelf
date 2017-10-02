'use strict'
const boom = require('boom')
const express = require('express')
const jwt = require('jsonwebtoken')
const knex = require ('../knex')
const { camelizeKeys, decamelizeKeys } = require ('humps')
const SECRET = "mySecret";

const router = express.Router()

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, SECRET, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'))
    }
    const id = payload.id;
    req.claim = id;
    next();
  })
}
router.get('/favorites', authorize, (req, res, next) => {
  knex('favorites')
    .innerJoin('books', 'books.id', 'favorites.book_id')
    .where('favorites.user_id', req.claim)
    .orderBy('books.title', 'ASC')
    .then((rows) => {
      const favs = camelizeKeys(rows)
      res.json(favs)
    })
    .catch((err) => {
      next(err)
    })
})
router.get('/favorites/check', authorize, (req, res, next) => {
  const bookId = Number.parseInt(req.query.bookId)
  const userId = req.claim
  if (!Number.isInteger(bookId)) {
    return next(boom.create(400, 'Book ID must be an integer'))
  }
  knex('books')
    .innerJoin('favorites', 'favorites.book_id', 'books.id')
    .where({
      'favorites.book_id': bookId,
      'favorites.user_id': userId,
    })
    .first()
    .then((row) => {
      if (row) {
        return res.send(true)
      }
      res.send(false)
    })
    .catch((err) => {
      next(err)
    })
})
router.post('/favorites', authorize, (req, res, next) => {
  const bookId = req.body.bookId
  const userId = req.claim
  knex('books')
    .where('id', bookId)
    .first()
    .then((book) => {
      if (!book) {
        throw boom.create(404, 'Book not found')
      }
      const insertFavorite = { bookId, userId: req.claim }

      return knex('favorites')
        .insert(decamelizeKeys(insertFavorite), '*')
    })
    .then((rows) => {
      const favorite = camelizeKeys(rows[0])
      res.send(favorite)
    })
    .catch((err) => {
      next(err)
    })
})



module.exports = router;
