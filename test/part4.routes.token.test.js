'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');
const { addDatabaseHooks } = require('./utils')

suite('part4 routes token', addDatabaseHooks(() => {
  test('GET /token without token', (done) => {
    request(server)
      .get('/token')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, 'false', done);
  });

  test('POST /token', (done) => {
    request(server)
      .post('/token')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        email: 'jkrowling@gmail.com',
        password: 'youreawizard'
      })
      .expect('set-cookie', /token=[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+; Path=\/;.+HttpOnly/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        id: 1,
        firstName: 'Joanne',
        lastName: 'Rowling',
        email: 'jkrowling@gmail.com'
      })
      .expect('Content-Type', /json/)
      .end(done);
  });

  test('GET /token with token', (done) => {
    const agent = request.agent(server);

    request(server)
      .post('/token')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        email: 'jkrowling@gmail.com',
        password: 'youreawizard'
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        agent.saveCookies(res);

        agent
          .get('/token')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, 'true', done);
      });
  });

  test('DELETE /token', (done) => {
    request(server)
      .del('/token')
      .set('Accept', 'application/json')
      .expect('set-cookie', /token=; Path=\//)
      .expect(200)
      .end(done);
  });

  test('POST /token with bad email', (done) => {
    request(server)
      .post('/token')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        email: 'bad.email@gmail.com',
        password: 'youreawizard'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Bad email or password', done);
  });

  test('POST /token with bad password', (done) => {
    request(server)
      .post('/token')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        email: 'jkrowling@gmail.com',
        password: 'badpassword'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Bad email or password', done);
  });
}));
