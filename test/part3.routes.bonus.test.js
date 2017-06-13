/* eslint-disable camelcase */

'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const bcrypt = require('bcrypt');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');
const { addDatabaseHooks } = require('./utils')

suite('part3 routes bonus', addDatabaseHooks(() => {
  test('POST /users with no email', (done) => {
    request(server)
      .post('/users')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        firstName: 'John',
        lastName: 'Siracusa',
        password: 'ilikebigcats'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Email must not be blank', done);
  });

  test('POST /users with no password', (done) => {
    request(server)
      .post('/users')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        firstName: 'John',
        lastName: 'Siracusa',
        email: 'john.siracusa@gmail.com'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Password must be at least 8 characters long', done);
  });

  test('POST /users with existing email', (done) => {
    /* eslint-disable no-sync */
    knex('users')
      .insert({
        first_name: 'John',
        last_name: 'Siracusa',
        email: 'john.siracusa@gmail.com',
        hashed_password: bcrypt.hashSync('ilikebigcats', 1)
      })
      .then(() => {
        request(server)
          .post('/users')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .send({
            firstName: 'John',
            lastName: 'Siracusa',
            email: 'john.siracusa@gmail.com',
            password: 'ilikebigcats'
          })
          .expect('Content-Type', /plain/)
          .expect(400, 'Email already exists', done);
      })
      .catch((err) => {
        done(err);
      });

      /* eslint-enable no-sync */
  });
}));
