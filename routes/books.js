'use strict';

const express = require('express');

const knex = require('../knex.js');


// eslint-disable-next-line new-cap
const router = express.Router();


//
const errHandle = (statusCode, msg) => {
  const err = {'output':{'statusCode': statusCode},'message': msg}
  return err;
}

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
  if (isNaN(id) || id < 0){
    return next(errHandle(404, "Not Found"));
  }

  knex("books")
    .where('id', id)
    .select('id', 'title', 'author', 'genre', 'description', 'cover_url as coverUrl', 'created_at as createdAt', 'updated_at as updatedAt')
    .then((books) => {
      if (books.length === 0){
        return next(errHandle(404, "Not Found"));
      }
      res.send(books[0]);
    })
    .catch((err) =>{
      return next(err);
    });
});

router.post('/books', (req, res, next) => {
  const {title, author, genre, description, cover_url} = req.body;

  if(!title){
    return next(errHandle(400, "Title must not be blank"));
  }
  if(!author){
    return next(errHandle(400, "Author must not be blank"));
  }
  if(!genre){
    return next(errHandle(400, "Genre must not be blank"));
  }
  if(!description){
    return next(errHandle(400, "Description must not be blank"));
  }
  if(!cover_url){
    return next(errHandle(400, "Cover URL must not be blank"));
  }

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
      if (books.length === 0){
        return next(errHandle(404, "Not Found"));
      }
      res.send(books[0]);
    })
    .catch((err) => {
      return next(err);
    });
});

router.patch('/books/:id', (req, res, next) =>{
  let id = Number.parseInt(req.params.id)
  if (Number.isNaN(id) || id < 0){
    return next(errHandle(404, "Not Found"));
  }
  knex('books')
    .where('id', id)
    .update({
      'title': req.body.title,
      'author': req.body.author,
      'genre': req.body.genre,
      'description': req.body.description,
      'cover_url': req.body.coverUrl
    })
    .returning(['id', 'title', 'author', 'genre', 'description', 'cover_url as coverUrl'])
    .then((books) => {
      console.log(books)
      if (!books){
        return next(errHandle(404, "Not Found"));
      }

      res.send(books[0])
    })
    .catch((err) => {
      return next(err)
    });
});

router.delete('/books/:id', (req, res, next) => {
  let id = parseInt(req.params.id)
  if (Number.isNaN(id) || id < 0){
    return next(errHandle(404, "Not Found"));
  }
  knex('books')
    .where('id', id)
    .first()
    .del()
    .returning(['title', 'author', 'genre', 'description', 'cover_url as coverUrl'])
    .then((books) => {
      if (!books) {
        return next(errHandle(404, "Not Found"))
      }
      res.send(books[0])
    })
    .catch((err) =>{
      return next(err)
    });
});


module.exports = router;
