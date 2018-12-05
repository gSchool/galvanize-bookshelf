'use strict';

const express = require('express');
// eslint-disable-next-line new-cap
const knex = require('../knex');
const router = express.Router();
const humps = require('humps')


router.get('/books', (req, res, next) => {
  knex('books')
  .orderBy('title')
  .then((books) => {
  var camel = humps.camelizeKeys(books)
    res.json(camel)
  })
  .catch((err) => {
    next(err)
  })
})
router.get('/books/:id', (req, res, next) => {
  knex('books')
  .where('id', req.params.id)
  .then((books) => {
    var camel = humps.camelizeKeys(books[0])
    res.json(camel)
  })
  .catch((err) => {
    next(err)
  })
})
router.post('/books', (req, res, next) => {
  const { title, author, genre, description, coverUrl } = req.body
  knex('books')
  .insert({
    title,
    author,
    genre,
    description,
    cover_url: coverUrl
  })
  .returning('*')
  .then((books) => {
    let book = {
      id: books[0].id,
      title: books[0].title,
      author: books[0].author,
      genre: books[0].genre,
      description: books[0].description,
      coverUrl: books[0].cover_url
    }
      res.json(book)
  })
  .catch((err) => {
    next(err)
  })
})
router.patch('/books/:id', (req, res, next) => {
  const id = req.params.id
  const { title, author, genre, description, coverUrl } = req.body

  let newBook = {}

  if (title) {
    newBook.title = title
  }
  if (author) {
    newBook.author = author
  }
  if (genre) {
    newBook.genre = genre
  }
  if (description) {
    newBook.description = description
  }
  if (coverUrl) {
    newBook.cover_url = coverUrl
  }

  knex('books')
  .where('id', id)

  .then((books) => {
    knex('books')
    .update(newBook)
    .where('id', id)
    .returning('*')

    .then((books) =>{
      let book = {
        id: books[0].id,
        title: books[0].title,
        author: books[0].author,
        genre: books[0].genre,
        description: books[0].description,
        coverUrl: books[0].cover_url
      }
      res.json(book)
    })
    .catch((err) => next (err))
  })
})

router.delete('/books/:id', (req, res, next) => {
  const id = req.params.id
  knex('books')

  .then((books) => {
    knex('books')
    .del()
    .where('id', id)
    .returning('*')

    .then((books) =>{
      let book = {
        title: books[0].title,
        author: books[0].author,
        genre: books[0].genre,
        description: books[0].description,
        coverUrl: books[0].cover_url
      }
      res.json(book)
    })
    .catch((err) => next (err))
  })
})

module.exports = router;
