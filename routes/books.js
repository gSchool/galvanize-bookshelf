const express = require('express')
const router = express.Router()
const knex = require('../knex')


router.get('/books', (req, res, next) => {
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


router.get('/books/:id', (req, res, next) => {
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



router.patch('/books/:id', (req, res, next) => {
  const id = +req.params.id
  let deleted

  knex('books')
    .update({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      description: req.body.description,
      cover_url: req.body.coverUrl
    }, '*')
    .where('id', id)
    .then((book) => {
      deleted = {
        id: book[0].id,
        title: book[0].title,
        author: book[0].author,
        genre: book[0].genre,
        description: book[0].description,
        coverUrl: book[0].cover_url
      }
      res.setHeader('Content-Type', 'application/json')
      res.status(200)
      res.json(deleted)
    })
    .catch((err) => next(err))
})


router.delete('/books/:id', (req, res, next) => {
  const id = req.params.id
  let deleted

  knex('books')
    .del()
    .where('id', id)
    .first()
    .then((book) => {
      // if (book.length !== 1) {
      //   return res.sendStatus(404)
      // }
      deleted = {
        // id: book.id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        description: book.description,
        coverUrl: book.cover_url
      }
      res.setHeader('Content-Type', 'application/json')
      res.status(200)
      res.json(deleted)
    })
    .catch((err) => next(err))
})

module.exports = router
