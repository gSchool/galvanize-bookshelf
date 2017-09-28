exports.seed= function(knex, Promise) {

  return knex.raw("SELECT setval('books_id_seq', (SELECT MAX(id) FROM books))")

}
