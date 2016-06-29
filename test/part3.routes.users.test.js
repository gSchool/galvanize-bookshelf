'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const {suite, test} = require('mocha');
const bcrypt = require('bcrypt');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');

suite('part3 routes users', () => {
  before(function(done) {
    knex.migrate.latest()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  beforeEach(function(done) {
    knex('users')
      .del()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('POST /users', (done) => {
    const password = 'ilikebigcats';

    request(server)
      .post('/users')
      .set('Content-Type', 'application/json')
      .send({
        first_name: 'John',
        last_name: 'Siracusa',
        email: 'john.siracusa@gmail.com',
        password: password
      })
      .expect('Content-Type', /plain/)
      .expect(200, 'OK')
      .end((httpErr, res) => {
        if (httpErr) {
          return done(httpErr);
        }

        knex('users')
          .first()
          .then((user) => {
            const hashed_password = user.hashed_password;

            delete user.id;
            delete user.hashed_password;
            delete user.created_at;
            delete user.updated_at;

            assert.deepEqual(user, {
              first_name: 'John',
              last_name: 'Siracusa',
              email: 'john.siracusa@gmail.com'
            });

            bcrypt.compare(password, hashed_password, (compErr, isMatch) => {
              if (compErr) {
                return done(compErr);
              }

              assert.isTrue(isMatch, "passwords don't match");

              done();
            });
          })
          .catch((dbErr) => {
            done(dbErr);
          });
      })
  });
});
