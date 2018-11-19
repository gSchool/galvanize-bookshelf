
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', (table)=>{
    table.increments();
      table.string('title').notNullable().defaultsTo('');
      table.string('author').notNullable().defaultsTo('');
      table.string('genre').notNullable().defaultsTo('');
      table.text('description').notNullable().defaultsTo('');
      table.text('cover_url').notNullable().defaultsTo('');
      table.timestamp('created_at').notNullable().defaultsTo(knex.raw('now()'));
    table.timestamp('updated_at').notNullable().defaultsTo(knex.raw('now()'));
  })
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable('books')
};
