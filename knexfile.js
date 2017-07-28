'use strict';

module.exports = {
  development: {
    'connection': 'postgres://localhost/bookshelf_dev',
    'client': 'pg'
  },

  test: {
    'connection': 'postgres://localhost/bookshelf_test',
    'client': 'pg'
  },

  production: {}
};
