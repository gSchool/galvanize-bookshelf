const data = require('../config/books');

exports.seed = (knex, Promise) => knex('books').del()
    .then(() => Promise.all([
      knex('books').insert(data.books),
    ]));
