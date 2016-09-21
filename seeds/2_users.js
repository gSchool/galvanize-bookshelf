/* eslint-disable max-len, camelcase, sort-keys */
'use strict';

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex(`users`).insert([{
      first_name: `Joanne`,
      last_name: `Rowling`,
      email: `jkrowling@gmail.com`,
      hashed_password: `$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS`,
      created_at: new Date(`2016-06-29 14:26:16 UTC`),
      updated_at: new Date(`2016-06-29 14:26:16 UTC`)
    }])
  ]);
};
