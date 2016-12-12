const data = require('../config/books');
exports.seed = function(knex, Promise) {
  return knex('books').del()
    .then(function () {
      return Promise.all([
        knex('books').insert(data.books)
      ]);
    });
};
