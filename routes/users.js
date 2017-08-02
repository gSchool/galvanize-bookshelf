"use strict";

const express = require("express");
const router = express.Router();

const knex = require("../knex.js");

const bcrypt = require("bcrypt-as-promised");
const jwt = require("jsonwebtoken");

router.post("/users", (req, res, next) => {
  let user = {};
  user.first_name = req.body.firstName;
  user.last_name = req.body.lastName;
  user.email = req.body.email;

  if (!user.first_name) { return sendError(next, "First Name must not be blank"); }
  else if (!user.last_name) { return sendError(next, "Last Name must not be blank"); }
  else if (!user.email) { return sendError(next, "Email must not be blank"); }

  validatePassword(next, req.body.password);

  bcrypt.hash(req.body.password, 12)
    .then((hashedPassword) => {
      user.hashed_password = hashedPassword;      

      return knex("users").where("users.email", user.email);
    })
    .then((result) => {
      if (result.length) {
        return sendError(next, "Email already exists");
      }
      return knex("users").insert(user, "*");
    })
    .then((result) => {
      delete result[0].hashed_password;

      const token = jwt.sign({userId: result[0].id}, process.env.JWT_KEY, {expiresIn: "7 days"});

      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        secure: router.get("env") === "production"
      });

      res.send({
        firstName: result[0].first_name,
        lastName:  result[0].last_name,
        email:     result[0].email,
        id:        result[0].id
      });

    })
    .catch((err) => {
      next(err);
    });
});

function sendError(next, message) {
  let err = {};

  err.message = message;
  err.output = {statusCode: 400};

  return next(err);
}

function validatePassword(next, pwd) {
  if (!pwd) {
    return sendError(next, "Password must be at least 8 characters long");
  }
  else if (pwd.length < 8) {
    return sendError(next, "Password must be at least 8 characters long");
  }
}

module.exports = router;
