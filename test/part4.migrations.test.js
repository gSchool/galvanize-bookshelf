'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const {suite, test} = require('mocha');
const knex = require('../knex');

suite('part4 migrations', () => {
  before(function(done) {
    knex.migrate.latest()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('users_books table', (done) => {
    knex('users_books').columnInfo()
      .then((actual) => {
        const expected = {
          id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: 'nextval(\'users_books_id_seq\'::regclass)'
          },

          book_id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: null
          },

          user_id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: null
          },

          created_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'now()'
          },

          updated_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'now()'
          }
        };

        for (const column in expected) {
          assert.deepEqual(
            actual[column],
            expected[column],
            `Column ${column} not the same`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
