exports.up = knex => knex.schema.createTable('books', (table) => {
  table.increments();
  table.string('title').notNullable().defaultTo('');
  table.string('author').notNullable().defaultTo('');
  table.string('genre').notNullable().defaultTo('');
  table.text('description').notNullable().defaultTo('');
  table.text('cover_url').notNullable().defaultTo('');
  table.timestamps(true, true);
});
exports.down = knex => knex.schema.dropTable('books');
