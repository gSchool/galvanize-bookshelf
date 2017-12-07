'use strict';

module.exports = {
  development: {client:'pg',
  connection:'postgresql://localhost/bookshelf_dev'},

  test: {client:'pg',
  connection:'postgresql://localhost/bookshelf_test'},

  production: {client: 'pg',
connection: process.env.DATABASE_URL}
};
