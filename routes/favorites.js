"use strict";

const humps = require("humps");

const express = require("express");
const knex = require("../knex");

const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/favorites", authorizeUser, (req, res, next) => {
  knex("favorites")
    .innerJoin("books", "favorites.book_id", "books.id")
    .where("user_id", req.payload.userId)
    .then((result) => {
      result = humps.camelizeKeys(result);
      res.send(result);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/favorites/check", authorizeUser, (req, res, next) => {
  const bookId = parseInt(req.query.bookId);

  if (!bookId || isNaN(bookId)) { return next({message: "Book ID must be an integer", output: {statusCode: 400}}); }

  knex("favorites")
    .where("book_id", bookId)
    .then((result) => {
      if (!result || result.length === 0) { return res.send(false); }
      res.send(true);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/favorites", authorizeUser, (req, res, next) => {
  const bookId = parseInt(req.body.bookId);

  if (!bookId || isNaN(bookId)) { return next({message: "Book ID must be an integer", output: {statusCode: 400}}); }  

  knex("books")
    .where("id", bookId)
    .then((result) => {
      if(result.length === 0) { return next({message: "Book not found", output: {statusCode: 404}}); }    
      return knex("favorites").insert({book_id: bookId, user_id: req.payload.userId}, ["id", "book_id", "user_id"]);
    })
    .then((result) => {
      result = humps.camelizeKeys(result[0]);

      res.send(result);
    })
    .catch((err) => {
      next(err);
    });
}); 

router.delete("/favorites", authorizeUser, (req, res, next) => {
  const bookId = parseInt(req.body.bookId);

  if (!bookId || isNaN(bookId)) { return next({message: "Book ID must be an integer", output: {statusCode: 400}}); }    

  knex("favorites")
    .where("book_id", bookId)
    .andWhere("user_id", req.payload.userId)
    .del(["book_id", "user_id"])
    .then((result) => {
      if(result.length === 0) { return next({message: "Favorite not found", output: {statusCode: 404}}); }          
      result = humps.camelizeKeys(result[0]);  
      res.send(result);
    })
    .catch((err) => {
      next(err);
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
