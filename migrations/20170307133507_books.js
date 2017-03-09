
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books',(table)=>{
    table.increments("id").primary();
    // table.text("books").defaultTo('');
    table.string('title').notNullable().defaultTo('');
    table.string('author').notNullable().defaultTo('');
    table.string('genre').notNullable().defaultTo('');
    table.text('description').notNullable().defaultTo('');
    table.text('cover_url').notNullable().defaultTo('');
    table.timestamps(true, true)
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("books");
};
