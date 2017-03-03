module.exports = {
  development: {
    client: 'pg',
    connection: 'postgress://localhost/bookshelf_dev',
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  test: {
    client: 'pg',
    connection: 'postgress://localhost/bookshelf_test',
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};
