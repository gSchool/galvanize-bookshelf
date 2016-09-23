/* eslint-disable max-len, camelcase, sort-keys */
'use strict';

exports.seed = (knex) => {
  return knex(`users`).del().then(() => {
    return knex.schema.raw(`ALTER SEQUENCE users_id_seq RESTART WITH 1;`).then(() => {
      return knex(`users`).insert([{
        first_name: `Joanne`,
        last_name: `Rowling`,
        email: `jkrowling@gmail.com`,
        hashed_password: `$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS`,  // youreawizard
        created_at: new Date(`2016-06-29 14:26:16 UTC`),
        updated_at: new Date(`2016-06-29 14:26:16 UTC`)
      }]);
    });
  });
};
