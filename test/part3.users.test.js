'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const {suite, test} = require('mocha');
const bcrypt = require('bcrypt');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');

suite('users routes', () => {
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
    const password = 'i like big cats';

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
            const user_password = user.password;

            delete user.id;
            delete user.password;
            delete user.created_at;
            delete user.updated_at;

            assert.deepEqual(user, {
              first_name: 'John',
              last_name: 'Siracusa',
              email: 'john.siracusa@gmail.com'
            });

            bcrypt.compare(password, user_password, (compErr, isMatch) => {
              if (compErr) {
                return done(compErr);
              }

              assert.isTrue(isMatch, "hashed passwords don't match");

              done();
            });
          })
          .catch((dbErr) => {
            done(dbErr);
          });
      })
  });
});
