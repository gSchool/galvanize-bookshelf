'use strict';
const knex = require('../knex');

// add knex database hooks to a test suite to tear down and build back
// up the database on each test in test suite. 
const addDatabaseHooks = (func) => {
  return function(...args) {
    beforeEach((done) => {
     knex.migrate.rollback()
     .then(() => {
       return knex.migrate.latest()
     })
     .then(() => {
       return knex.seed.run()
     })
     .finally(() => {
       done();
     })
    });

    afterEach((done) => {
      knex.migrate.rollback()
      .finally(() => {
        done();
      });
    });

    return func(...args);
  }
}

module.exports = {
  addDatabaseHooks
};
