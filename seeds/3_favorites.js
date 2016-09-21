/* eslint-disable max-len, camelcase, sort-keys */
'use strict';

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex(`favorites`).insert([{
      book_id: 1,
      user_id: 1,
      created_at: new Date(`2016-06-29 14:26:16 UTC`),
      updated_at: new Date(`2016-06-29 14:26:16 UTC`)
    }])
  ]);
};
