'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');
const { addDatabaseHooks } = require('./utils')

// eslint-disable-next-line max-statements
suite('part2 routes bonus', addDatabaseHooks(() => {
  test('GET /books/9000', (done) => {
    request(server)
      .get('/books/9000')
      .set('Accept', 'application/json')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });

  test('GET /books/-1', (done) => {
    request(server)
      .get('/books/-1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });

  test('GET /books/one', (done) => {
    request(server)
      .get('/books/one')
      .set('Accept', 'application/json')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });

  test('POST /books without title', (done) => {
    /* eslint-disable max-len */
    request(server)
      .post('/books')
      .set('Accept', 'application/json')
      .send({
        genre: 'Python',
        author: 'Allen B. Downey',
        description: 'If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3.',
        coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Title must not be blank', done);

      /* eslint-enable max-len */
  });

  test('POST /books without author', (done) => {
    /* eslint-disable max-len */
    request(server)
      .post('/books')
      .set('Accept', 'application/json')
      .send({
        title: 'Think Python',
        genre: 'Python',
        description: 'If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3.',
        coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Author must not be blank', done);

      /* eslint-enable max-len */
  });

  test('POST /books without genre', (done) => {
    /* eslint-disable max-len */
    request(server)
      .post('/books')
      .set('Accept', 'application/json')
      .send({
        title: 'Think Python',
        author: 'Allen B. Downey',
        description: 'If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3.',
        coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Genre must not be blank', done);

      /* eslint-enable max-len */
  });

  test('POST /books without description', (done) => {
    /* eslint-disable max-len */
    request(server)
      .post('/books')
      .set('Accept', 'application/json')
      .send({
        title: 'Think Python',
        author: 'Allen B. Downey',
        genre: 'Python',
        coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Description must not be blank', done);

      /* eslint-enable max-len */
  });

  test('POST /books without coverUrl', (done) => {
    /* eslint-disable max-len */
    request(server)
      .post('/books')
      .set('Accept', 'application/json')
      .send({
        title: 'Think Python',
        author: 'Allen B. Downey',
        genre: 'Python',
        description: 'If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3.'
      })
      .expect('Content-Type', /plain/)
      .expect(400, 'Cover URL must not be blank', done);

      /* eslint-enable max-len */
  });

  test('PATCH /books/9000', (done) => {
    request(server)
      .patch('/books/9000')
      .set('Accept', 'application/json')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });

  test('PATCH /books/-1', (done) => {
    request(server)
      .patch('/books/-1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });

  test('PATCH /books/one', (done) => {
    request(server)
      .patch('/books/one')
      .set('Accept', 'application/json')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });

  test('DELETE /books/9000', (done) => {
    request(server)
      .del('/books/9000')
      .set('Accept', 'application/json')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });

  test('DELETE /books/-1', (done) => {
    request(server)
      .del('/books/-1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });

  test('DELETE /books/one', (done) => {
    request(server)
      .del('/books/one')
      .set('Accept', 'application/json')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });
}));
