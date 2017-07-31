"use strict";

const express = require("express");

const router = express.Router();

const knex = require("../knex.js");

router.get("/books", (req, res, next) => {
  knex("books")
    .select("id", "title", "author", "genre", "description", "cover_url as coverUrl", "created_at as createdAt", "updated_at as updatedAt")
    .orderBy("title", "asc")
    .then((books) => {
      res.send(books);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/books/:id", (req, res, next) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) { return next(); }

  knex("books")
    .select("id", "title", "author", "genre", "description", "cover_url as coverUrl", "created_at as createdAt", "updated_at as updatedAt")
    .where("id", id)
    .then((book) => {
      if (!book.length) { return next(); }
      res.send(book[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/books", (req, res, next) => {
  let book = {};
  book.title = req.body.title;
  book.author = req.body.author;
  book.genre = req.body.genre;
  book.description = req.body.description;
  book.cover_url = req.body.coverUrl;
  
  if (!book.title) {
    return sendError(next, "Title");
  }
  else if (!book.author) {
    return sendError(next, "Author");
  }
  else if (!book.genre) {
    return sendError(next, "Genre");    
  }    
  else if (!book.description) {
    return sendError(next, "Description");
  }
  else if (!book.cover_url) {
    return sendError(next, "Cover URL");
  }

  knex("books")
    .insert(book)
    .returning(["id", "title", "author", "genre", "description", "cover_url as coverUrl"])
    .then((response) => {
      res.send(response[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.patch("/books/:id", (req, res, next) => {
  let book = {};
  book.id = parseInt(req.params.id);
  book.title = req.body.title;
  book.author = req.body.author;
  book.genre = req.body.genre;
  book.description = req.body.description;
  book.cover_url = req.body.coverUrl;

  if (isNaN(book.id)) { return next(); }

  knex("books")
    .update(book)
    .where("id", book.id)
    .returning(["id", "title", "author", "genre", "description", "cover_url as coverUrl"])
    .then((response) => {
      if (!book.length) { return next(); }
      
      res.send(response[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/books/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) { return next(); }
  
  knex("books")
  .where("id", id)
  .returning(["title", "author", "genre", "description", "cover_url as coverUrl"])  
  .del()
  .then((response) => {
    if (!response.length) { return next(); }
    
    res.send(response[0]);
  })
  .catch((err) => {
    next(err);
  });
});

function sendError(next, field) {
  let err = {};

  err.message = `${field} must not be blank`;
  err.output = {statusCode: 400};

  return next(err);
}

module.exports = router;
