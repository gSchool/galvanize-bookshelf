'use strict';
//This will trigger when I use knex migrate: latest
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments().primary();
    table.string('first_name').notNullable().defaultTo('');
    table.string('last_name').notNullable().defaultTo('');
    table.string('email').unique().notNullable();
    table.specificType('hashed_password', 'char(60)').notNullable();
    // table.timestamp("created_at").defaultTo(knex.raw('now()')).notNullable();
    // table.timestamp("updated_at").defaultTo(knex.raw('now()')).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
