const data = require('../config/books');

exports.seed = (knex, Promise) => knex('books').del()

.then(knex.raw("SELECT setval('books_id_seq', (SELECT MAX(id) FROM books)")
    .then(() => Promise.all([
        knex('books').insert(data.books),
    ])));

// SELECT setval('books_id_seq', (SELECT MAX(id) FROM books));
