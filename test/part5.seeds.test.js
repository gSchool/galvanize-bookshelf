/* eslint-disable camelcase */

'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');

const { addDatabaseHooks } = require('./utils')

suite('part5 seeds', addDatabaseHooks(() => {
  test('favorites rows', (done) => {
    knex('favorites').orderBy('id', 'ASC')
      .then((actual) => {
        const expected = [{
          id: 1,
          book_id: 1,
          user_id: 1,
          created_at: new Date('2016-06-29 14:26:16 UTC'),
          updated_at: new Date('2016-06-29 14:26:16 UTC')
        }];

        for (let i = 0; i < expected.length; i++) {
          assert.deepEqual(
            actual[i],
            expected[i],
            `Row id=${i + 1} not the same`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
}));
