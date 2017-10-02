const express = require('express')
const jwt = require('jsonwebtoken')
const knex = require('../knex')
const { camelizeKeys, decamelizeKeys } = require('humps')

const router = express.Router()

router.get('/favorites', (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.setHeader('content-type', 'text/plain')
      res.status(401)
      res.send('Unauthorized')
    } else {
      knex('favorites')
        .innerJoin('books', 'books.id', 'favorites.user_id')
        .where('favorites.user_id', payload.userId)
        .then((data) => {
          const results = camelizeKeys(data)
          res.status(200)
          res.json(results)
        })
    }
  })
})

router.get('/favorites/check', (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.setHeader('content-type', 'text/plain')
      res.status(401)
      res.send('Unauthorized')
    } else {
      knex('favorites')
        .where('book_id', req.query.bookId)
        .andWhere('user_id', payload.userId)
        .then((data) => {
          res.status(200)
          if (data.length > 0) {
            res.json(true)
          } else {
            res.json(false)
          }
        })
    }
  })
})

router.post('/favorites', (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.setHeader('content-type', 'text/plain')
      res.status(401)
      res.send('Unauthorized')
    } else {
      const newBook = {
        user_id: payload.userId,
        book_id: req.body.bookId
      }
      knex('favorites')
        .insert(newBook)
        .returning('*')
        // .first()
        .then((data) => {
          res.status(200)
          res.json(camelizeKeys(data[0]))
        })
    }
  })
})

router.delete('/favorites', (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.setHeader('content-type', 'text/plain')
      res.status(401)
      res.send('Unauthorized')
    } else {
      knex('favorites')
        .del()
        .where('user_id', payload.userId)
        .andWhere('book_id', req.body.bookId)
        .then(() => {
          const deleted = {
            bookId: req.body.bookId,
            userId: payload.userId
          }
          res.status(200)
          res.json(deleted)
        })
    }
  })
})

module.exports = router
