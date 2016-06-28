# Express and Knex

For this assignment, you'll build a RESTful, database-driven HTTP server, using Express and Knex, to manage your migrated and seeded database. Your server will handle the following HTTP requests and send the appropriate HTTP response.

**NOTE:** Both the request body and the response body use the `application/json` content type.

| Request Method | Request URL        | Request Body                                                                                             | Response Status | Response Body                                                                                                                                |
|----------------|--------------------|----------------------------------------------------------------------------------------------------------|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `GET`          | `/books`           | N/A                                                                                                      | `200`           | `[{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }, ...]`                               |                                            |
| `GET`          | `/books/3`         | N/A                                                                                                      | `200`           | `{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }`                                      |
| `POST`         | `/books`           | `{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }`  | `200`           | `{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }`                                      |
| `PATCH`        | `/books/3`         | `{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }`  | `200`           | `{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }`                                      |
| `DELETE`       | `/books/3`         | N/A                                                                                                      | `200`           | `{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }`                                      |
| `GET`          | `/authors`         | N/A                                                                                                      | `200`           | `[{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }, ...]`                              |
| `GET`          | `/authors/3`       | N/A                                                                                                      | `200`           | `{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }`                                     |
| `POST`         | `/authors`         | `{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }` | `200`           | `{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }`                                     |
| `PATCH`        | `/authors/3`       | `{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }` | `200`           | `{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }`                                     |
| `DELETE`       | `/authors/3`       | N/A                                                                                                      | `200`           | `{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }`                                     |
| `GET`          | `/authors/3/books` | N/A                                                                                                      | `200`           | `[{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }, ...]` (books that the author wrote) |

To get started, install the necessary dependencies via NPM.

```shell
cd galvanize-bookshelf
npm install
```

To run the test suite can test you route specified above. You can run the tests in the shell.

**NOTE:** For each route handler, the test suite only tests the _positive_ case where the server responds with a `200` status code.

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

The `GET` all requests (`/books`, `/authors`, `/authors/:id/books`) produces an array. PostgreSQL does not ensure any particular order. For the tests to pass, ensure the order of the array is by the `id` value of the resource.
