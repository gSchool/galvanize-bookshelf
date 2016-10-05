/* eslint-disable sort-keys, camelcase */
'use strict';

const Joi = require(`joi`);

module.exports = {
  books: {
    body: {
      title: Joi.string().required(),
      author: Joi.string().required(),
      genre: Joi.string().required(),
      description: Joi.string().required(),
      coverUrl: Joi.string().required().uri()
    }
  }
};
