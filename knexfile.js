'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/bookshelf_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/bookshelf_test'
  },

  production: {
    client: 'pg',
    connection: 'https://johnyork-erwin-bookshelf.herokuapp.com/'
  }
};
