/* eslint-disable no-sync */
'use strict';

const express = require(`express`);

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
const knex = require(`../knex`);
const humps = require(`humps`);
const bcrypt = require(`bcrypt`);
const boom = require(`boom`);

router.get(`/`, (req, res) => {
  if (req.session.userId) { res.json(true); }
  else { res.json(false); }
});

router.post(`/`, (req, res, next) => {
  const user = req.body;

  knex(`users`)
  .where(`email`, user.email)
  .select(`id`, `first_name`, `last_name`, `email`, `hashed_password`)
  .first()
  .then((result) => {
    if (result && bcrypt.compareSync(user.password, result.hashed_password)) {
      delete result.hashed_password;
      req.session.userId = result;
      res.json(humps.camelizeKeys(result));
    }
    else {
      throw boom.create(400, 'Bad email or password');
    }
  })
  .catch((err) => { next(err); });
});

router.delete(`/`, (req, res) => {
  req.session = null;
  res.json(true);
});

module.exports = router;
