
exports.up = function(knex) {
  return knex.schema.createTable('favorites', (table) => {
    table.increments('id');
    table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE').index();
    table.integer('book_id').notNullable().references('books.id').onDelete('CASCADE').index();
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('favorites');
};
