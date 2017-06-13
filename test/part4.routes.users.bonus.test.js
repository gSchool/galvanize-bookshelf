/* eslint-disable camelcase */

'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const bcrypt = require('bcrypt');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');
const { addDatabaseHooks } = require('./utils')

suite('part4 routes users bonus', addDatabaseHooks(() => {
  test('POST /users', (done) => {
    const password = 'ilikebigcats';

    request(server)
      .post('/users')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        firstName: 'John',
        lastName: 'Siracusa',
        email: 'john.siracusa@gmail.com',
        password
      })
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        id: 2,
        firstName: 'John',
        lastName: 'Siracusa',
        email: 'john.siracusa@gmail.com'
      })
      .expect('Content-Type', /json/)
      .expect('set-cookie', /token=[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+; Path=\/;.+HttpOnly/)
      .end(done);
  });
}));
