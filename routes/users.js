'use strict';

const express = require('express');
const router = express.Router();

const knex = require("../knex.js");

const bcrypt = require("bcrypt");

router.post("/users", (req, res, next) => {
  let user = {};
  user.first_name = req.body.firstName;
  user.last_name = req.body.lastName;
  user.email = req.body.email;

  bcrypt.hash(req.body.password, 12)
    .then((hashedPassword) => {
      user.hashed_password = hashedPassword;
      return knex("users").insert(user, "*");
    })
    .then((result) => {
      delete result[0].hashed_password;

      res.send({
        firstName: result[0].first_name,
         lastName: result[0].last_name,
            email: result[0].email,
               id: result[0].id
      });

    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
