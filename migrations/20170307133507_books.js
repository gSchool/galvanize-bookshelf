
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

//
// exports.up = function(knex) {
//   return knex.schema.createTable('tracks', (table) => {
//     table.increments();
//     table.integer('artist_id')
//       .notNullable()
//       .references('id')
//       .inTable('artists')
//       .onDelete('CASCADE')
//       .index();
//     table.string('title').notNullable().defaultTo('');
//     table.integer('likes').notNullable().defaultTo(0);
//     table.timestamps(true, true);
//   });
// };

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("books");
};
