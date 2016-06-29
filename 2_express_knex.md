# Express and Knex

In this assignment, you'll build a RESTful, database-driven HTTP server, using Express and Knex, to manage your migrated and seeded database. Your server will handle the following HTTP requests and send the appropriate HTTP response.

**NOTE:** The information in both the request body and the response body use the `application/json` content type.

| Request Method | Request URL        | Request Body                                                                                             | Response Status | Response Body                                                                                                                                |
|----------------|--------------------|----------------------------------------------------------------------------------------------------------|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `GET`          | `/authors`         | N/A                                                                                                      | `200`           | `[{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }, ...]`                              |
| `GET`          | `/authors/3`       | N/A                                                                                                      | `200`           | `{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }`                                     |
| `POST`         | `/authors`         | `{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }` | `200`           | `{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }`                                     |
| `PATCH`        | `/authors/3`       | `{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }` | `200`           | `{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }`                                     |
| `DELETE`       | `/authors/3`       | N/A                                                                                                      | `200`           | `{ "first_name": "Bonnie", "last_name": "Eisenman", "biography": "...", "portrait_url": "https://..." }`                                     |
| `GET`          | `/authors/3/books` | N/A                                                                                                      | `200`           | `[{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }, ...]` (books that the author wrote) |

In the `routes/authors.js` module, add the necessary middleware to handle above RESTful route table. Note that the middleware for the following HTTP requests must respond with an array of entities ordered by their `id` attribute.

- `GET /authors`
- `GET /authors/:id/books`

You can run the following test suite to verify the positive case when each middleware responds with a `200` status code.

```shell
npm test test/part2.routes.authors.test.js
```

## Bonus

| Request Method | Request URL        | Request Body                                                                                             | Response Status | Response Body                                                                                                                                |
|----------------|--------------------|----------------------------------------------------------------------------------------------------------|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `GET`          | `/books`           | N/A                                                                                                      | `200`           | `[{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }, ...]`                               |                                            |
| `GET`          | `/books/3`         | N/A                                                                                                      | `200`           | `{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }`                                      |
| `POST`         | `/books`           | `{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }`  | `200`           | `{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }`                                      |
| `PATCH`        | `/books/3`         | `{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }`  | `200`           | `{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }`                                      |
| `DELETE`       | `/books/3`         | N/A                                                                                                      | `200`           | `{ "title": "Python In A Nutshell", "author_id": 2, "genre": "Python", "description": "This book..." }`                                      |

In the `routes/books.js` module, add the necessary middleware to handle above RESTful route table. Note that the middleware for the following HTTP requests must respond with an array of entities ordered by their `id` attribute.

- `GET /books`

You can run the following test suite to verify the positive case when each middleware responds with a `200` status code.

```shell
npm test test/part2.routes.books.test.js
```
