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
  },
  favorites: {
    body: {
      bookId: Joi.number().integer().required(),
      userId: Joi.number().integer().required()
    }
  },
  session: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  },
  users: {
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }
};
