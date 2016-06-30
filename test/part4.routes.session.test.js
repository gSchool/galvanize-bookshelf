'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const {suite, test} = require('mocha');
const bcrypt = require('bcrypt');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');

suite('part4 routes session', () => {
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

  test('POST /session', (done) => {
    const password = 'ilikebigcats';

    knex('users')
      .insert({
        first_name: 'John',
        last_name: 'Siracusa',
        email: 'john.siracusa@gmail.com',
        hashed_password: bcrypt.hashSync(password, 1)
      })
      .then(() => {
        request(server)
          .post('/session')
          .set('Content-Type', 'application/json')
          .send({
            email: 'john.siracusa@gmail.com',
            password: password
          })
          .expect('set-cookie', /loggedIn=true; Path=\//)
          .expect('set-cookie', /session=[a-zA-Z0-9=]*; path=\//)
          .expect('set-cookie', /session.sig=[a-zA-Z0-9=\-_]*; path=\//)
          .expect('Content-Type', /plain/)
          .expect(200, 'OK', done);
      })
      .catch((err) => {
        done(err);
      });
  });

  test('POST /session with bad email', (done) => {
    const password = 'ilikebigcats';

    knex('users')
      .insert({
        first_name: 'John',
        last_name: 'Siracusa',
        email: 'john.siracusa@gmail.com',
        hashed_password: bcrypt.hashSync(password, 1)
      })
      .then(() => {
        request(server)
          .post('/session')
          .set('Content-Type', 'application/json')
          .send({
            email: 'bad.email@gmail.com',
            password: password
          })
          .expect('Content-Type', /plain/)
          .expect(401, 'Unauthorized', done);
      })
      .catch((err) => {
        done(err);
      });
  });

  test('POST /session with bad password', (done) => {
    knex('users')
      .insert({
        first_name: 'John',
        last_name: 'Siracusa',
        email: 'john.siracusa@gmail.com',
        hashed_password: bcrypt.hashSync('ilikebigcats', 1)
      })
      .then(() => {
        request(server)
          .post('/session')
          .set('Content-Type', 'application/json')
          .send({
            email: 'john.siracusa@gmail.com',
            password: 'badpassword'
          })
          .expect('Content-Type', /plain/)
          .expect(401, 'Unauthorized', done);
      })
      .catch((err) => {
        done(err);
      });
  });

  test('DELETE /session', (done) => {
    request(server)
      .delete('/session')
      .expect('set-cookie', /loggedIn=; Path=\//)
      .expect('set-cookie', /session=; path=\//)
      .expect('set-cookie', /session.sig=[a-zA-Z0-9=\-_]*; path=\//)
      .expect('Content-Type', /plain/)
      .expect(200, 'OK', done);
  });
});
