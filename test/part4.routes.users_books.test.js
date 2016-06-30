'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const bcrypt = require('bcrypt');
const {suite, test} = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');

suite('part4 routes users_books', () => {
  const agent = request.agent(server);

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
    knex.seed.run()
      .then(() => {
        request(server)
          .post('/session')
          .set('Content-Type', 'application/json')
          .send({
            email: 'jkrowling@gmail.com',
            password: 'youreawizard'
          })
          .end(function (err, res) {
            if (err) {
              return done(err);
            }

            agent.saveCookies(res);
            done();
          });
      })
      .catch((err) => {
        done(err);
      });
  });

  test('GET /users/books', (done) => {
    agent
      .get('/users/books')
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body.forEach((book) => {
          delete book.created_at;
          delete book.updated_at;
        });
      })
      .expect(200, [{
        id: 1,
        book_id: 1,
        author_id: 2,
        title: 'Python In A Nutshell',
        genre: 'Python',
        description: 'This book offers Python programmers one place to look when they need help remembering or deciphering the syntax of this open source language and its many powerful but scantily documented modules. This comprehensive reference guide makes it easy to look up the most frequently needed information--not just about the Python language itself, but also the most frequently used parts of the standard library and the most important third-party extensions.',
        cover_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/python_in_a_nutshell.jpg',
        user_id: 1
      }], done);
  });

  test('GET /users/books/1', (done) => {
    agent
      .get('/users/books/1')
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.created_at;
        delete res.body.updated_at;
      })
      .expect(200, {
        id: 1,
        book_id: 1,
        author_id: 2,
        title: 'Python In A Nutshell',
        genre: 'Python',
        description: 'This book offers Python programmers one place to look when they need help remembering or deciphering the syntax of this open source language and its many powerful but scantily documented modules. This comprehensive reference guide makes it easy to look up the most frequently needed information--not just about the Python language itself, but also the most frequently used parts of the standard library and the most important third-party extensions.',
        cover_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/python_in_a_nutshell.jpg',
        user_id: 1
      }, done);
  });

  test('GET /users/books/2', (done) => {
    agent
      .get('/users/books/2')
      .expect(404, done);
  });

  test('POST /users/books/2', (done) => {
    agent
      .post('/users/books/2')
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.created_at;
        delete res.body.updated_at;
      })
      .expect(200, {
        id: 2,
        book_id: 2,
        user_id: 1
      }, done);
  });

  test('DELETE /users/books/1', (done) => {
    agent
      .delete('/users/books/1')
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.created_at;
        delete res.body.updated_at;
      })
      .expect(200, {
        book_id: 1,
        user_id: 1
      }, done);
  });
});
