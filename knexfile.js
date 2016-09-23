/* eslint-disable sort-keys */
'use strict';

module.exports = {
  development: {
    client: `pg`,
    connection: `postgres://localhost/bookshelf_dev`
  },
  test: {
    client: `pg`,
    connection: `postgres://localhost/bookshelf_test`
  },
  production: {
    client: `pg`,
    connnection: process.env.DATABASE_URL
  }
};
