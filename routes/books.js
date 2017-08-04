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
      if (!book.length) { return sendError(next, "Not Found", 404); }
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
    return sendError(next, "Title must not be blank", 400);
  }
  else if (!book.author) {
    return sendError(next, "Author must not be blank", 400);
  }
  else if (!book.genre) {
    return sendError(next, "Genre must not be blank", 400);    
  }    
  else if (!book.description) {
    return sendError(next, "Description must not be blank", 400);
  }
  else if (!book.cover_url) {
    return sendError(next, "Cover URL must not be blank", 400);
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

  if (isNaN(book.id)) { return sendError(next, "Not Found", 404); }
  
  knex("books")
    .update(book)
    .where("id", book.id)
    .returning(["id", "title", "author", "genre", "description", "cover_url as coverUrl"])
    .then((response) => {
      if (response.length === 0) { return sendError(next, "Not Found", 404); }

      res.send(response[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/books/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) { return sendError(next, "Not Found", 404); }
  
  knex("books")
  .where("id", id)
  .returning(["title", "author", "genre", "description", "cover_url as coverUrl"])  
  .del()
  .then((response) => {
    if (!response.length) { return sendError(next, "Not Found", 404); }
    
    res.send(response[0]);
  })
  .catch((err) => {
    next(err);
  });
});

function sendError(next, error, statusCode) {
  let err = {};

  err.message = error;
  err.output = {statusCode: statusCode};

  return next(err);
}

module.exports = router;
