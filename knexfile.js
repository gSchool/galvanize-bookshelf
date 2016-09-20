// Update with your config settings.
'use strict';

module.exports = {
  development: {
    client: `pg`,
    connection: `postgres://localhost/bookshelf_dev`
  },
  test: {
    client: `pg`,
    connection: `postgres://localhost/bookshelf_test`
  }
};
