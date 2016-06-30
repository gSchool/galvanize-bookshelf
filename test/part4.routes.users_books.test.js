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
  const password = 'ilikebigcats';

  before(function(done) {
    knex.migrate.latest()
      .then(() => {
        return knex.seed.run();
      })
      .then(() => {
        return knex('users').del();
      })
      .then(() => {
        return knex('users')
          .insert({
            id: 1,
            first_name: 'John',
            last_name: 'Siracusa',
            email: 'john.siracusa@gmail.com',
            hashed_password: bcrypt.hashSync(password, 1)
          });
      })
      .then(() => {
        return knex.raw("SELECT setval('users_books_id_seq', 1);");
      })
      .then(() => {
        request(server)
          .post('/session')
          .set('Content-Type', 'application/json')
          .send({
            email: 'john.siracusa@gmail.com',
            password: password
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

  test('POST /users/books/:bookId', (done) => {
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
        id: 2,
        book_id: 2,
        author_id: 2,
        title: 'Think Python',
        genre: 'Python',
        description: 'If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3.',
        cover_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg',
        user_id: 1
      }], done);
  });

  test('GET /users/books/:bookId 200', (done) => {
    agent
      .get('/users/books/2')
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.created_at;
        delete res.body.updated_at;
      })
      .expect(200, {
        id: 2,
        book_id: 2,
        author_id: 2,
        title: 'Think Python',
        genre: 'Python',
        description: 'If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3.',
        cover_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg',
        user_id: 1
      }, done);
  });

  test('GET /users/books/:bookId 404', (done) => {
    agent
      .get('/users/books/1')
      .expect(404, done);
  });

  test('DELETE /users/books/:bookId', (done) => {
    agent
      .delete('/users/books/2')
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.created_at;
        delete res.body.updated_at;
      })
      .expect(200, {
        book_id: 2,
        user_id: 1
      }, done);
  });
});
