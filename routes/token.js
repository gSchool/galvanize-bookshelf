"use strict";

const knex = require("../knex");
const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-as-promised");

router.get("/token", (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) { return res.send(false); }
    return res.send(true);
  });
});

router.post("/token", (req, res, next) => {
  let user = {};

  if (!req.body.email) { return next({message: "Email must not be blank", output: {statusCode: 400}}); }
  if (!req.body.password) { return next({message: "Password must not be blank", output: {statusCode: 400}}); }  
  
  knex("users")
    .where("email", req.body.email)
    .first()
    .then((result) => {
      if (!result) { return next({message: "Bad email or password", output: {statusCode: 400}}); }

      user.id = result.id;
      user.email = result.email;
      user.firstName = result.first_name;
      user.lastName = result.last_name;

      return bcrypt.compare(req.body.password, result.hashed_password)
        .then(() => {
          const claim = { userId: user.id };
          const token = jwt.sign(claim, process.env.JWT_KEY, { expiresIn: '7 days' });

          res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            secure: router.get("env") === "production"
          });

          res.send(user);
        })
        .catch(bcrypt.MISMATCH_ERROR, () => {
          return next({message: "Bad email or password", output: {statusCode: 400}});
        })
        .catch((err) => {
          return next(err);
        });
    });
});

router.delete("/token", (req, res, next) => {
  res.clearCookie("token");
  res.end();
});

module.exports = router;
