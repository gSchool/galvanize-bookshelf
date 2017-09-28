
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('first_name').notNullable().defaultTo('')
    table.string('last_name').notNullable().defaultTo('')
    table.string('email').notNullable().unique()
    table.specificType('hashed_password', 'char(60)').notNullable()
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'))
  });
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
