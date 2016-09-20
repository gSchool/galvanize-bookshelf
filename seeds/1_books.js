/* eslint-disable max-len */
/* eslint-disable camelcase */
'use strict';


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(`books`).del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex(`books`).insert([
          {
            author: `Douglas Crockford`,
            cover_url: `https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/284/javascript_the_good_parts.jpg`,
            created_at: new Date(`2016-06-26 14:26:16 UTC`),
            description: `Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined. This authoritative book scrapes away these bad features to reveal a subset of JavaScript that's more reliable, readable, and maintainable than the language as a whole—a subset you can use to create truly extensible and efficient code.`,
            genre: `JavaScript`,
            id: 1,
            title: `JavaScript, The Good Parts`,
            updated_at: new Date(`2016-06-26 14:26:16 UTC`)
          }, {
            author: `Bonnie Eisenman`,
            cover_url: `https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/287/learning_react_native.jpg`,
            created_at: new Date(`2016-06-26 14:26:16 UTC`),
            description: `Get a practical introduction to React Native, the JavaScript framework for writing and deploying fully featured mobile apps that look and feel native. With this hands-on guide, you'll learn how to build applications that target iOS, Android, and other mobile platforms instead of browsers. You'll also discover how to access platform features such as the camera, user location, and local storage.`,
            genre: `React`,
            id: 2,
            title: `Learning React Native`,
            updated_at: new Date(`2016-06-26 14:26:16 UTC`)
          }, {
            author: `Michael Fogus`,
            cover_url: `https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/297/functional_javascript.jpg`,
            created_at: new Date(`2016-06-26 14:26:16 UTC`),
            description: `How can you overcome JavaScript language oddities and unsafe features? With this book, you'll learn how to create code that's beautiful, safe, and simple to understand and test by using JavaScript's functional programming support. Author Michael Fogus shows you how to apply functional-style concepts with Underscore.js, a JavaScript library that facilitates functional programming techniques.`,
            genre: `JavaScript`,
            id: 3,
            title: `Functional JavaScript`,
            updated_at: new Date(`2016-06-26 14:26:16 UTC`)
          }, {
            author: `Stoyan Stefanov`,
            cover_url: `https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/294/react_up_and_running.jpg`,
            created_at: new Date(`2016-06-26 14:26:16 UTC`),
            description: `Hit the ground running with React, the open-source technology from Facebook for building rich web applications fast. With this practical guide, Yahoo! web developer Stoyan Stefanov teaches you how to build components—React's basic building blocks—and organize them into maintainable, large-scale apps. If you're familiar with basic JavaScript syntax, you're ready to get started.`,
            genre: `React`,
            id: 4,
            title: `React: Up & Running`,
            updated_at: new Date(`2016-06-26 14:26:16 UTC`)
          }, {
            author: `Addy Osmani`,
            cover_url: `https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/295/javascript_design_patterns.jpg`,
            created_at: new Date(`2016-06-26 14:26:16 UTC`),
            description: `With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.`,
            genre: `JavaScript`,
            id: 5,
            title: `Learning JavaScript Design Patterns`,
            updated_at: new Date(`2016-06-26 14:26:16 UTC`)
          }, {
            author: `Daniel Parker`,
            cover_url: `https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/296/javascript_with_promises.jpg`,
            created_at: new Date(`2016-06-26 14:26:16 UTC`),
            description: `Asynchronous JavaScript is everywhere, whether you're using Ajax, AngularJS, Node.js, or WebRTC. This practical guide shows intermediate to advanced JavaScript developers how Promises can help you manage asynchronous code effectively—including the inevitable flood of callbacks as your codebase grows. You'll learn the inner workings of Promises and ways to avoid difficulties and missteps when using them.`,
            genre: `JavaScript`,
            id: 6,
            title: `JavaScript with Promises`,
            updated_at: new Date(`2016-06-26 14:26:16 UTC`)
          }, {
            author: `Shyam Seshadri`,
            cover_url: `http://akamaicovers.oreilly.com/images/0636920033486/lrg.jpg`,
            created_at: new Date(`2016-06-26 14:26:16 UTC`),
            description: `If you want to get started with AngularJS, either as a side project, an additional tool, or for your main work, this practical guide teaches you how to use this meta-framework step-by-step, from the basics to advanced concepts. By the end of the book, you'll understand how to develop a large, maintainable, and performant application with AngularJS.`,
            genre: `Angular`,
            id: 7,
            title: `AngularJS: Up and Running`,
            updated_at: new Date(`2016-06-26 14:26:16 UTC`)
          }, {
            author: `Ethan Brown`,
            cover_url: `http://akamaicovers.oreilly.com/images/0636920032977/lrg.jpg`,
            created_at: new Date(`2016-06-26 14:26:16 UTC`),
            description: `Learn how to build dynamic web applications with Express, a key component of the Node/JavaScript development stack. In this hands-on guide, author Ethan Brown teaches you the fundamentals through the development of a fictional application that exposes a public website and a RESTful API. You'll also learn web architecture best practices to help you build single-page, multi-page, and hybrid web apps with Express.`,
            genre: `Node`,
            id: 8,
            title: `Web Development with Node and Express`,
            updated_at: new Date(`2016-06-26 14:26:16 UTC`)
          }
        ])
      ]);
    });
};
