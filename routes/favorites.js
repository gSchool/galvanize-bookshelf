"use strict";

const humps = require("humps");

const express = require("express");
const knex = require("../knex");

const jwt = require("jsonwebtoken")

const router = express.Router();

router.get("/favorites", authorizeUser, (req, res, next) => {
  knex("favorites")
    .innerJoin("books", "favorites.book_id", "books.id")
    .where("user_id", req.payload.userId)
    .then((result) => {
      result = humps.camelizeKeys(result);
      res.send(result);
    });
});

router.get("/favorites/check", authorizeUser, (req, res, next) => {
  const bookId = parseInt(req.query.bookId);

  if (!bookId || isNaN(bookId)) { return next({message: "No book specified", output: {statusCode: 400}}); }

  knex("favorites")
    .where("book_id", bookId)
    .then((result) => {
      if (!result || result.length === 0) { return res.send(false); }
      res.send(true);
    });
});

router.post("/favorites", authorizeUser, (req, res, next) => {
  const bookId = parseInt(req.body.bookId);

  knex("favorites")
    .insert({book_id: bookId, user_id: req.payload.userId}, ["id", "book_id", "user_id"])
    .then((result) => {
      result = humps.camelizeKeys(result[0]);
      res.send(result);
    });
}); 

router.delete("/favorites", authorizeUser, (req, res, next) => {
  const bookId = parseInt(req.body.bookId);

  knex("favorites")
    .where("book_id", bookId)
    .andWhere("user_id", req.payload.userId)
    .del(["book_id", "user_id"])
    .then((result) => {
      result = humps.camelizeKeys(result[0]);  
      res.send(result);
    });
});

function authorizeUser(req, res, next) {
  if (!req.cookies || !req.cookies.token) { return next({message: "Unauthorized", output: {statusCode: 401}}); }
  
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) { return next({message: "Unauthorized", output: {statusCode: 401}}); }

    req.payload = payload;

    next();
  });
}

module.exports = router;
