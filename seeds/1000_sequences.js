//for books
exports.seed= function(knex, Promise) {

  return knex.raw("SELECT setval('books_id_seq', (SELECT MAX(id) FROM books))")

}

//for users
exports.seed = function(knex, Promise) {

return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))")
}
