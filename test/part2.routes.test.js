'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');
const { addDatabaseHooks } = require('./utils')
suite('part2 routes', addDatabaseHooks(() => {
  test('GET /books', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/books')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
        id: 7,
        title: 'AngularJS: Up and Running',
        author: 'Shyam Seshadri',
        genre: 'Angular',
        description: 'If you want to get started with AngularJS, either as a side project, an additional tool, or for your main work, this practical guide teaches you how to use this meta-framework step-by-step, from the basics to advanced concepts. By the end of the book, you\'ll understand how to develop a large, maintainable, and performant application with AngularJS.',
        coverUrl: 'http://akamaicovers.oreilly.com/images/0636920033486/lrg.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 3,
        title: 'Functional JavaScript',
        author: 'Michael Fogus',
        genre: 'JavaScript',
        description: 'How can you overcome JavaScript language oddities and unsafe features? With this book, you\'ll learn how to create code that\'s beautiful, safe, and simple to understand and test by using JavaScript\'s functional programming support. Author Michael Fogus shows you how to apply functional-style concepts with Underscore.js, a JavaScript library that facilitates functional programming techniques.',
        coverUrl: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/297/functional_javascript.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 6,
        title: 'JavaScript with Promises',
        author: 'Daniel Parker',
        genre: 'JavaScript',
        description: 'Asynchronous JavaScript is everywhere, whether you\'re using Ajax, AngularJS, Node.js, or WebRTC. This practical guide shows intermediate to advanced JavaScript developers how Promises can help you manage asynchronous code effectively—including the inevitable flood of callbacks as your codebase grows. You\'ll learn the inner workings of Promises and ways to avoid difficulties and missteps when using them.',
        coverUrl: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/296/javascript_with_promises.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 1,
        title: 'JavaScript, The Good Parts',
        author: 'Douglas Crockford',
        genre: 'JavaScript',
        description: "Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined. This authoritative book scrapes away these bad features to reveal a subset of JavaScript that's more reliable, readable, and maintainable than the language as a whole—a subset you can use to create truly extensible and efficient code.",
        coverUrl: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/284/javascript_the_good_parts.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 5,
        title: 'Learning JavaScript Design Patterns',
        author: 'Addy Osmani',
        genre: 'JavaScript',
        description: 'With Learning JavaScript Design Patterns, you\'ll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.',
        coverUrl: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/295/javascript_design_patterns.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 2,
        title: 'Learning React Native',
        author: 'Bonnie Eisenman',
        genre: 'React',
        description: 'Get a practical introduction to React Native, the JavaScript framework for writing and deploying fully featured mobile apps that look and feel native. With this hands-on guide, you\'ll learn how to build applications that target iOS, Android, and other mobile platforms instead of browsers. You\'ll also discover how to access platform features such as the camera, user location, and local storage.',
        coverUrl: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/287/learning_react_native.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 4,
        title: 'React: Up & Running',
        author: 'Stoyan Stefanov',
        genre: 'React',
        description: 'Hit the ground running with React, the open-source technology from Facebook for building rich web applications fast. With this practical guide, Yahoo! web developer Stoyan Stefanov teaches you how to build components—React\'s basic building blocks—and organize them into maintainable, large-scale apps. If you\'re familiar with basic JavaScript syntax, you\'re ready to get started.',
        coverUrl: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/294/react_up_and_running.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, {
        id: 8,
        title: 'Web Development with Node and Express',
        author: 'Ethan Brown',
        genre: 'Node',
        description: 'Learn how to build dynamic web applications with Express, a key component of the Node/JavaScript development stack. In this hands-on guide, author Ethan Brown teaches you the fundamentals through the development of a fictional application that exposes a public website and a RESTful API. You\'ll also learn web architecture best practices to help you build single-page, multi-page, and hybrid web apps with Express.',
        coverUrl: 'http://akamaicovers.oreilly.com/images/0636920032977/lrg.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }], done);

      /* eslint-enable max-len */
  });

  test('GET /books/:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/books/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        id: 1,
        title: 'JavaScript, The Good Parts',
        author: 'Douglas Crockford',
        genre: 'JavaScript',
        description: "Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined. This authoritative book scrapes away these bad features to reveal a subset of JavaScript that's more reliable, readable, and maintainable than the language as a whole—a subset you can use to create truly extensible and efficient code.",
        coverUrl: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/284/javascript_the_good_parts.jpg',
        createdAt: '2016-06-26T14:26:16.000Z',
        updatedAt: '2016-06-26T14:26:16.000Z'
      }, done);

      /* eslint-enable max-len */
  });

  test('POST /books', (done) => {
    /* eslint-disable max-len */
    request(server)
      .post('/books')
      .set('Accept', 'application/json')
      .send({
        title: 'Think Python',
        author: 'Allen B. Downey',
        genre: 'Python',
        description: 'If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3.',
        coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
      })
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        id: 9,
        title: 'Think Python',
        author: 'Allen B. Downey',
        genre: 'Python',
        description: 'If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3.',
        coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
      }, done);

      /* eslint-enable max-len */
  });

  test('PATCH /books/:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .patch('/books/1')
      .set('Accept', 'application/json')
      .send({
        title: 'Think like Python',
        author: 'Allen B. Downey',
        genre: 'Python stuff',
        description: 'More Python',
        coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
      })
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        id: 1,
        title: 'Think like Python',
        author: 'Allen B. Downey',
        genre: 'Python stuff',
        description: 'More Python',
        coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
      }, done);

      /* eslint-enable max-len */
  });

  test('DELETE /books/:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .del('/books/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        title: 'JavaScript, The Good Parts',
        author: 'Douglas Crockford',
        genre: 'JavaScript',
        description: 'Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined. This authoritative book scrapes away these bad features to reveal a subset of JavaScript that\'s more reliable, readable, and maintainable than the language as a whole—a subset you can use to create truly extensible and efficient code.',
        coverUrl: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/284/javascript_the_good_parts.jpg'
      }, done);

      /* eslint-enable max-len */
  });
}));
