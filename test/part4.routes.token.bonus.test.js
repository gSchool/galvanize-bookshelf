'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');
const { addDatabaseHooks } = require('./utils')

suite('part4 routes token bonus', addDatabaseHooks(() => {
  test('POST /token with no email', (done) => {
    request(server)
      .post('/token')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        password: 'youreawizard'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Email must not be blank', done);
  });

  test('POST /token with no password', (done) => {
    request(server)
      .post('/token')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        email: 'jkrowling@gmail.com'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Password must not be blank', done);
  });
}));
