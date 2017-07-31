'use strict';

const express = require('express');

const knex = require('../knex.js');


// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/books', (req, res, next) => {
  knex("books")
    .select('id', 'title', 'author', 'genre', 'description', 'cover_url as coverUrl', 'created_at as createdAt', 'updated_at as updatedAt')
    .orderBy('title', 'ASC')
    .then((books) => {
      res.send(books);
    })
    .catch((err) =>{
      return next(err);
    });
});

router.get('/books/:id', (req, res, next) => {
  let id = req.params.id
  knex("books")
    .where('id', id)
    .select('id', 'title', 'author', 'genre', 'description', 'cover_url as coverUrl', 'created_at as createdAt', 'updated_at as updatedAt')
    .then((books) => {
      res.send(books[0]);
    })
    .catch((err) =>{
      return next(err);
    });
});

router.post('/books', (req, res, next) => {
  knex("books")
    .insert({
      'title': req.body.title,
      'author': req.body.author,
      'genre': req.body.genre,
      'description': req.body.description,
      'cover_url': req.body.coverUrl
    })
    .returning(['id', 'title', 'author', 'genre', 'description', 'cover_url as coverUrl'])
    .then((books) => {
      res.send(books[0]);
    })
    .catch((err) => {
      return next(err);
    });
});

router.patch('/books/:id', (req, res, next) =>{
  knex('books')
    .where('id', req.params.id)
    .update({
      'title': req.body.title,
      'author': req.body.author,
      'genre': req.body.genre,
      'description': req.body.description,
      'cover_url': req.body.coverUrl
    })
    .returning(['id', 'title', 'author', 'genre', 'description', 'cover_url as coverUrl'])
    .then((books) => {
      res.send(books[0])
    })
    .catch((err) => {
      return next(err)
    })
})

router.delete('/books/:id', (req, res, next) => {
  knex('books')
    .where('id', req.params.id)
    .del()
    .returning(['title', 'author', 'genre', 'description', 'cover_url as coverUrl'])
    .then((books) =>{
      res.send(books[0])
    })
    .catch((err) =>{
      return next(err)
    })
})

module.exports = router;
