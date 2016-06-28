# Express and Knex

Now that we have a database with data set up, we can now build some routes that access the books and authors table. In this assignment, you will implement a RESTful interface for books and authors. It should have the following routes as described below.

| Request Method | Request URL        | Request Body                                                                                             | Response Status | Response Content-Type | Response Body                                                                                                                                |
|----------------|--------------------|----------------------------------------------------------------------------------------------------------|-----------------|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `POST`         | `/books`           | `{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }`  | `200`           | `application/json`    | `{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }`                                      |
| `GET`          | `/books`           | N/A                                                                                                      | `200`           | `application/json`    | `[{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }, ...]`                               |                                            |
| `GET`          | `/books/3`         | N/A                                                                                                      | `200`           | `application/json`    | `{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }`                                      |
| `PATCH`        | `/books/3`         | `{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }`  | `200`           | `application/json`    | `{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }`                                      |
| `DELETE`       | `/books/3`         | N/A                                                                                                      | `200`           | `application/json`    | `{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }`                                      |
| `POST`         | `/authors`         | `{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }` | `200`           | `application/json`    | `{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }`                                     |
| `GET`          | `/authors`         | N/A                                                                                                      | `200`           | `application/json`    | `[{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }, ...]`                              |
| `GET`          | `/authors/3`       | N/A                                                                                                      | `200`           | `application/json`    | `{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }`                                     |
| `PATCH`        | `/authors/3`       | `{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }` | `200`           | `application/json`    | `{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }`                                     |
| `DELETE`       | `/authors/3`       | N/A                                                                                                      | `200`           | `application/json`    | `{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }`                                     |
| `GET`          | `/authors/3/books` | N/A                                                                                                      | `200`           | `application/json`    | `[{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }, ...]` (books that the author wrote) |

To get started, install any new dependencies that have been introduced.

```shell
cd galvanize-bookshelf
npm install
```

A test case has been created for each route specified above. It only tests the _positive_ case, that is, the case where the route should produce a `200` response status. You can run the tests in the shell.

```shell
npm test
```

## Notes

The tests require the `server.js` file to export the express server for the tests. At the bottom of your `server.js` file, add `module.exports = app;` (assuming app is the variable you used for your server). For example.

```javascript
express = require('express');
app = express();

// ...

module.exports = app;
```

The `GET` all requests (`books`, `authors`, `authors/:id/books`) produces an array. PostgreSQL does not ensure any particular order. For the tests to pass, ensure the order of the array is by the `id` value of the resource.
