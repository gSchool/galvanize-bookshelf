/* eslint-disable camelcase */

'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils')

suite('part5 migrations', addDatabaseHooks(() => {
  test('favorites columns', (done) => {
    knex('favorites').columnInfo()
      .then((actual) => {
        const expected = {
          id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: 'nextval(\'favorites_id_seq\'::regclass)'
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
            `Column ${column} is not the same`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('favorites constraints', (done) => {
    const query = `
      SELECT
        tc.table_name, kcu.column_name,
        ccu.table_name AS foreign_table_name,
        ccu.column_name AS foreign_column_name
      FROM
        information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
      WHERE constraint_type = 'FOREIGN KEY' AND tc.table_name='favorites';
    `;

    knex.raw(query)
      .then((result) => {
        const actual = result.rows;

        /* eslint-disable-next-line camelcase */
        const expected = [{
          table_name: 'favorites',
          column_name: 'book_id',
          foreign_table_name: 'books',
          foreign_column_name: 'id'
        }, {
          table_name: 'favorites',
          column_name: 'user_id',
          foreign_table_name: 'users',
          foreign_column_name: 'id'
        }];

        for (const column in expected) {
          assert.deepEqual(
            actual[column],
            expected[column],
            `Column ${column} is not the same`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
}));
