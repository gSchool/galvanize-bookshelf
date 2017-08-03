
exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites', (table) => {
    table.increments(),
    table.integer('user_id').notNullable().references('users.id').onDelete('cascade').index(),
    table.integer('book_id').notNullable().references('books.id').onDelete('cascade').index(),
    table.timestamp('created_at').notNull().default(knex.fn.now()),
    table.timestamp('updated_at').notNull().default(knex.fn.now())
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorites');
};
