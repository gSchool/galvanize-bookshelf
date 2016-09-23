/* eslint-disable max-len */
'use strict';

exports.up = (knex) => {
  return knex.schema.dropTableIfExists(`favorites`).then(() => {
    return knex.schema.createTable(`favorites`, (table) => {
      table.increments();
      table.integer(`book_id`).notNullable().references(`books.id`).onDelete(`cascade`);
      table.integer(`user_id`).notNullable().references(`users.id`).onDelete(`cascade`);
      table.timestamps(true, true);
    });
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable(`favorites`);
};
