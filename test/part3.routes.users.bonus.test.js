'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const {suite, test} = require('mocha');
const bcrypt = require('bcrypt');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');

suite('part3 routes users bonus', () => {
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

  test('POST /users with no email', (done) => {
    request(server)
      .post('/users')
      .set('Content-Type', 'application/json')
      .send({
        first_name: 'John',
        last_name: 'Siracusa',
        password: 'ilikebigcats'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Email must not be blank', done);
  });

  test('POST /users with no password', (done) => {
    request(server)
      .post('/users')
      .set('Content-Type', 'application/json')
      .send({
        first_name: 'John',
        last_name: 'Siracusa',
        email: 'john.siracusa@gmail.com'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Password must not be blank', done);
  });

  test('POST /users with existing email', (done) => {
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
          .set('Content-Type', 'application/json')
          .send({
            first_name: 'John',
            last_name: 'Siracusa',
            email: 'john.siracusa@gmail.com',
            password: 'ilikebigcats'
          })
          .expect('Content-Type', /plain/)
          .expect(400, 'Email already exists', done);
      })
      .catch((err) => {
        done(err);
      });
  });
});
