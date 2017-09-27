'use strict'

const express = require('express')
const router = express.Router()
const knex = require('../knex')


router.get('/books', function (req, res, next) {
  knex('books')
    .select('id', 'title', 'author', 'genre', 'description', 'cover_url as coverUrl', 'created_at as createdAt', 'updated_at as updatedAt')
    .orderBy('title', 'ASC')
    .then((data) => {
      res.setHeader('Content-Type', 'application/json')
      res.status(200)
      res.json(data)
    })
    .catch((err) => next(err))
})


router.get('/books/:id', function (req, res, next) {
  const id = req.params.id

  knex('books')
    .select('id', 'title', 'author', 'genre', 'description', 'cover_url as coverUrl', 'created_at as createdAt', 'updated_at as updatedAt')
    .orderBy('title', 'ASC')
    .where('id', id)
    .then((data) => {
      if (data.length < 1) {
        return res.sendStatus(404)
      }
      res.setHeader('Content-Type', 'application/json')
      res.status(200)
      res.json(data[0])
    })
    .catch((err) => next(err))
})


router.post('/books', (req, res, next) => {
  knex('books')
  .insert({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.coverUrl
  }, '*')
  .then((book) => {
    const newBook = {
      id: book[0].id,
      title: book[0].title,
      author: book[0].author,
      genre: book[0].genre,
      description: book[0].description,
      coverUrl: book[0].cover_url
    }
    res.send(newBook)
  })
  .catch((err) => next(err))
})

//
//
// router.patch('/:id', function (req, res, next) {
//   const id = req.params.id
//   const title = req.body.title
//   const author = req.body.author
//   const genre = req.body.genre
//   const description = req.body.description
//   const cover_url = req.body.cover_url
//   const created_at = req.body.created_at
//   const updated_at = req.body.updated_at
//   let obj = {}
//
//   if (id) {
//     obj.id = id
//   }
//
//   if (title) {
//     obj.title = title
//   }
//
//   if (title) {
//     obj.title = title
//   }
//
//   if (author) {
//     obj.author = author
//   }
//
//   if (genre) {
//     obj.genre = genre
//   }
//
//   if (description) {
//     obj.description = description
//   }
//
//   if (cover_url) {
//     obj.cover_url = cover_url
//   }
//
//   if (created_at) {
//     obj.created_at = created_at
//   }
//
//   if (updated_at) {
//     obj.updated_at = updated_at
//   }
//
//   knex('books')
//     .update(obj)
//     .where('id', id)
//     .then((rowsAffected) => {
//       if (rowsAffected !== 1) {
//         return res.sendStatus(404)
//       }
//       res.setHeader('Content-Type', 'application/json')
//       res.sendStatus(200)
//     })
//     .catch((err) => next(err))
// })
//
//
// router.delete('/:id', function (req, res, next) {
//   const id = req.params.id
//
//   knex('books')
//     .del()
//     .where('id', id)
//     .then((rowsAffected) => {
//       if (rowsAffected !== 1) {
//         return res.sendStatus(404)
//       }
//       res.setHeader('Content-Type', 'application/json')
//       res.sendStatus(200)
//     })
//     .catch((err) => next(err))
// })

module.exports = router
