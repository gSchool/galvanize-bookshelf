/* eslint-disable camelcase, no-sync */
'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
const knex = require(`../knex`);
const humps = require(`humps`);
const bcrypt = require(`bcrypt`);

router.post(`/users`, (req, res, next) => {
  const hash = bcrypt.hashSync(req.body.password, 8);
  delete req.body.password;
  req.body.hashed_password = hash;
  knex(`users`)
  .returning([`id`, `first_name`, `last_name`, `email`])
  .insert(humps.decamelizeKeys(req.body))
  .then((newb) => res.json(humps.camelizeKeys(newb[0])))
  .catch((err) => next(err));
});

module.exports = router;
