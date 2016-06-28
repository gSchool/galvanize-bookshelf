'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const {suite, test} = require('mocha');
const request = require('supertest');
const knex = require('../knex');

suite('seeds', () => {
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
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('authors', (done) => {
    knex('authors').orderBy('id', 'ASC')
      .then((actual) => {
        const expected = [{
          id: 1,
          first_name: 'Alex',
          last_name: 'Martelli',
          biography: 'Alex Martelli spent 8 years with IBM Research, winning three Outstanding Technical Achievement Awards.He then spent 13 as a Senior Software Consultant at think3 inc, developing libraries, network protocols, GUI engines, event frameworks, and web access frontends. He has also taught programming languages, development methods, and numerical computing at Ferrara University and other venues. He\'s a C++ MVP for Brainbench, and a member of the Python Software Foundation. He currently works for AB Strakt, a Python-centered software house in Goteborg, Sweden, mostly by telecommuting from his home in Bologna, Italy. Alex\'s proudest achievement is the articles that appeared in Bridge World (January/February 2000), which were hailed as giant steps towards solving issues that had haunted contract bridge theoreticians for decades.',
          portrait_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/alex_martelli.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 2,
          first_name: 'Anna',
          last_name: 'Ravenscroft',
          biography: 'Anna Martelli Ravenscroft is an experienced speaker and trainer, with diverse background developing curricula for church, regional transit, disaster preparedness; developing web applications for therapy, learning, fitness; writing technical books, articles and presentations; active member of Open Source community; skilled at translating between IT professionals and end users.',
          portrait_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/anna_ravenscroft.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 3,
          first_name: 'Allen B.',
          last_name: 'Downey',
          biography: 'Allen Downey is a Professor of Computer Science at Olin College of Engineering. He has taught at Wellesley College, Colby College and U.C. Berkeley. He has a Ph.D. in Computer Science from U.C. Berkeley and Master\'s and Bachelor\'s degrees from MIT.',
          portrait_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/allen_downey.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 4,
          first_name: 'Bonnie',
          last_name: 'Eisenman',
          biography: 'Bonnie Eisenman is a software engineer at Codecademy, with previous experience at Fog Creek Software and Google. She has spoken at several conferences on topics ranging from ReactJS to musical programming and Arduinos. In her spare time, she enjoys building electronic musical instruments, tinkering with hardware projects, and laser-cutting chocolate. Find her on Twitter as @brindelle.',
          portrait_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/bonnie_eisenman.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 5,
          first_name: 'Kyle',
          last_name: 'Simpson',
          biography: 'Kyle Simpson is an Open Web Evangelist who\'s passionate about all things JavaScript. He\'s an author, workshop trainer, tech speaker, and OSS contributor/leader.',
          portrait_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/kyle_simpson.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 6,
          first_name: 'George',
          last_name: 'Heineman',
          biography: 'George T. Heineman is an Associate Professor of Computer Science at WPI. His research interests are in Software Engineering. He co-edited the 2001 book "Component-Based Software Engineering: Putting the Pieces Together". He was the Program Chair for the 2005 International Symposium on Component-Based Software Engineering.',
          portrait_url: 'http://cdn.oreillystatic.com/images/people/154/george_heineman1.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 7,
          first_name: 'David',
          last_name: 'Flanagan',
          biography: 'David Flanagan is a computer programmer who spends most of his time writing about JavaScript and Java. His books with O\'Reilly include JavaScript: The Definitive Guide, JavaScript Pocket Reference, Java in a Nutshell, Java Examples in a Nutshell, and Java Foundation Classes in a Nutshell.',
          portrait_url: 'http://cdn.oreillystatic.com/images/people/154/george_heineman1.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 8,
          first_name: 'Jay',
          last_name: 'McGavren',
          biography: 'Jay McGavren was doing automation for a hotel services company when a colleague introduced him to Programming Perl (a.k.a. the Camel Book). It made him an instant Perl convert, as he liked actually writing code instead of waiting for a 10-person development team to configure a build system. It also gave him the crazy idea to write a technical book someday.',
          portrait_url: 'http://cdn.oreillystatic.com/images/people/154/jay_mcgavren1.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 9,
          first_name: 'Shyam',
          last_name: 'Seshadri',
          biography: 'Currently based out of India, Shyam Seshadri is the CEO of Fundoo Solutions (http://www.befundoo.com), Ex-Googler, Author and Chef. He currently spends his time working on interesting product ideas, conducting training sessions internationally on AngularJS & NodeJS, and providing development and architecture consulting on AngularJS, NodeJS and Mobile applications. He conducts extensive, customized two and three day, hands-on workshops for AngularJS & NodeJS, which have been well received internationally.',
          portrait_url: 'http://cdn.oreillystatic.com/images/people/154/shyam_seshadri-1.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 10,
          first_name: 'Ethan',
          last_name: 'Brown',
          biography: 'Ethan Brown is a senior software engineer at Pop Art, a Portland-based interactive marketing agency, where he is responsible for the architecture and implementation of web sites and web services for clients ranging from small businesses to international enterprise companies. He has over twenty years of programming experience, from embedded to the web, and has embraced the JavaScript stack as the web platform of the future.',
          portrait_url: 'http://cdn.oreillystatic.com/images/people/154/ethan_brown.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 11,
          first_name: 'Chris',
          last_name: 'Mayfield',
          biography: 'Chris Mayfield is an Assistant Professor of Computer Science at James Madison University. He has a Ph.D. in Computer Science from Purdue University and Bachelor\'s degrees in CS and German from the University of Utah. His research focuses on CS education and K-12.',
          portrait_url: 'http://cdn.oreillystatic.com/images/people/154/ethan_brown.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 12,
          first_name: 'Julia',
          last_name: 'Elman',
          biography: 'Julia Elman is a designer, developer, author, speaker and tech education advocate based in North Carolina and has been working her brand of web skills since 2002. Her creative nature drove her to find work at Hallmark Cards, Inc in 2007 where she worked on projects such as the Product (RED) campaign and Hallmark\'s site re-design. From there, she took a dive into Django as a Junior Designer/Developer at World Online in Lawrence, KS. In early 2013, she helped start a local chapter of Girl Develop It and empowered over 1000 members to learn computer programming. She also helped organize the 2013 Teen Tech Camp, where 20 local teens learned Python programming in a one-day event.',
          portrait_url: 'http://cdn.oreillystatic.com/images/people/154/julia_elman-1.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }];

        for (let i = 0; i < expected.length; i++) {
          assert.deepEqual(
            actual[i],
            expected[i]
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('books', (done) => {
    knex('books').orderBy('id', 'ASC')
      .then((actual) => {
        const expected = [{
          id: 1,
          author_id: 2,
          title: 'Python In A Nutshell',
          genre: 'Python',
          description: 'This book offers Python programmers one place to look when they need help remembering or deciphering the syntax of this open source language and its many powerful but scantily documented modules. This comprehensive reference guide makes it easy to look up the most frequently needed information--not just about the Python language itself, but also the most frequently used parts of the standard library and the most important third-party extensions.',
          cover_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/python_in_a_nutshell.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 2,
          author_id: 2,
          title: 'Think Python',
          genre: 'Python',
          description: 'If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3.',
          cover_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 3,
          author_id: 4,
          title: 'Learning React Native',
          genre: 'JavaScript',
          description: 'Get a practical introduction to React Native, the JavaScript framework for writing and deploying fully featured mobile apps that look and feel native. With this hands-on guide, you’ll learn how to build applications that target iOS, Android, and other mobile platforms instead of browsers. You’ll also discover how to access platform features such as the camera, user location, and local storage.',
          cover_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/learning_react_native.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 4,
          author_id: 5,
          title: 'You Don\'t Know JS',
          genre: 'JavaScript',
          description: 'No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. As part of the ""You Don’t Know JS"" series, this compact guide focuses on new features available in ECMAScript 6 (ES6), the latest version of the standard upon which JavaScript is built.',
          cover_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/es6_and_beyond.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 5,
          author_id: 6,
          title: 'Algorithms in a Nutshell',
          genre: 'Computer Science',
          description: 'Creating robust software requires the use of efficient algorithms, but programmers seldom think about them until a problem occurs. This updated edition of Algorithms in a Nutshell describes a large number of existing algorithms for solving a variety of problems, and helps you select and implement the right algorithm for your needs—with just enough math to let you understand and analyze algorithm performance.',
          cover_url: 'http://akamaicovers.oreilly.com/images/0636920032885/lrg.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 6,
          author_id: 7,
          title: 'The Ruby Programming Language',
          genre: 'Ruby',
          description: 'The Ruby Programming Language documents the Ruby language definitively but without the formality of a language specification. It is written for experienced programmers who are new to Ruby, and for current Ruby programmers who want to challenge their understanding and increase their mastery of the language.',
          cover_url: 'http://akamaicovers.oreilly.com/images/9780596516178/lrg.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 7,
          author_id: 8,
          title: 'Head First Ruby',
          genre: 'Ruby',
          description: 'What’s all the buzz about this Ruby language? Is it right for you? Well, ask yourself: are you tired of all those extra declarations, keywords, and compilation steps in your other language? Do you want to be a more productive programmer? Then you’ll love Ruby. With this unique hands-on learning experience, you’ll discover how Ruby takes care of all the details for you, so you can simply have fun and get more done with less code.',
          cover_url: 'http://akamaicovers.oreilly.com/images/9780596803995/lrg.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 8,
          author_id: 9,
          title: 'AngularJS: Up and Running',
          genre: 'JavaScript',
          description: 'If you want to get started with AngularJS, either as a side project, an additional tool, or for your main work, this practical guide teaches you how to use this meta-framework step-by-step, from the basics to advanced concepts. By the end of the book, you’ll understand how to develop a large, maintainable, and performant application with AngularJS.',
          cover_url: 'http://akamaicovers.oreilly.com/images/0636920033486/lrg.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 9,
          author_id: 10,
          title: 'Web Development with Node and Express',
          genre: 'JavaScript',
          description: 'Learn how to build dynamic web applications with Express, a key component of the Node/JavaScript development stack. In this hands-on guide, author Ethan Brown teaches you the fundamentals through the development of a fictional application that exposes a public website and a RESTful API. You’ll also learn web architecture best practices to help you build single-page, multi-page, and hybrid web apps with Express.',
          cover_url: 'http://akamaicovers.oreilly.com/images/0636920032977/lrg.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 10,
          author_id: 11,
          title: 'Think Java',
          genre: 'Java',
          description: 'Think Java is appropriate as a textbook in an introductory college or high school class. The book is currently in use at several colleges, universities, and high schools. It’s appropriate for people learning Java as a first language, including students learning on their own and professionals who are retraining.',
          cover_url: 'http://akamaicovers.oreilly.com/images/0636920041610/rc_lrg.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 11,
          author_id: 12,
          title: 'Lightweight Django',
          genre: 'Python',
          description: 'How can you take advantage of the Django framework to integrate complex client-side interactions and real-time features into your web applications? Through a series of rapid application development projects, this hands-on book shows experienced Django developers how to include REST APIs, WebSockets, and client-side MVC frameworks such as Backbone.js into new or existing projects.',
          cover_url: 'http://akamaicovers.oreilly.com/images/0636920032502/lrg.jpg',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }];

        for (let i = 0; i < expected.length; i++) {
          assert.deepEqual(
            actual[i],
            expected[i],
            `Row id=${i + 1} not the same`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
