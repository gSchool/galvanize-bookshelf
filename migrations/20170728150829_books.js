
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', (table) => {
    table.increments(),
    table.string('title').notNull().default(''),
    table.string('author').notNull().default(''),
    table.string('genre').notNull().default(''),
    table.text('description').notNull().default(''),
    table.text('cover_url').notNull().default(''),
    table.timestamp('created_at').notNull().default(knex.fn.now()),
    table.timestamp('updated_at').notNull().default(knex.fn.now())
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
