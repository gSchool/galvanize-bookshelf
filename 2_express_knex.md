#### [⇐ Previous](1_migrations_seeds.md) | [Next ⇒](3_user_registration.md)

# Express and Knex

In this assignment, you'll build a RESTful, database-driven, HTTP server, using Express and Knex, to manage your migrated and seeded database.

## Books

In the `routes/books.js` module, add middleware to handle the following HTTP requests and send back the associated HTTP response. The information in both the request body and response body use the `application/json` content type.

| Request Method | Request URL        | Request Body                                             | Response Status | Response Body                                                          |
|----------------|--------------------|----------------------------------------------------------|-----------------|------------------------------------------------------------------------|
| `GET`          | `/books`           | N/A                                                      | `200`           | `[{ id: 1, "title": "JavaScript, The Good Parts", ... }, ...]`         |
| `GET`          | `/books/1`         | N/A                                                      | `200`           | `{ id: 1, "title": "JavaScript, The Good Parts", ... }`                |
| `POST`         | `/books`           | `{ "title": "You Don't Know JS: Types & Grammar", ... }` | `200`           | `{ id: 9, "title": "You Don't Know JS: Types & Grammar", ... }`        |
| `PATCH`        | `/books/9`         | `{ description: "Looks at type coercion problems." }`    | `200`           | `{ id: 9, ..., description: "Looks at type coercion problems.", ... }` |
| `DELETE`       | `/books/9`         | N/A                                                      | `200`           | `{ "title": "You Don't Know JS: Types & Grammar", ... }`               |

**NOTE:** The response to a `GET /books` request must contain all book entities ordered by their `title` column.

You can run the following test suite to verify the middleware works as expected.

```shell
npm test test/part2.routes.test.js
```

## Bonus

After migrating and seeding the `bookshelf_dev` database, start an HTTP server.

```shell
npm start
```

And open the books page.

```shell
open http://localhost:8000/index.html
```

Then, play around with the live application by viewing, editing, and deleting its books. As you play, take a peek at the code for the client application and familiarize yourself with the following techniques.

- How the HTML files scaffold the base structure and content that's presented on page load.
- How the JavaScript files modify this structure and content as a result of AJAX requests.
- How the CSS files customize the look-and-feel of the structure and content.

**TIP:** It's important to remember how these techniques work because you'll be building both a server application and a client application for your Q2 Project.

## Bonus

In the `routes/books.js` module, update the middleware to handle the following HTTP requests and send back the associated HTTP response. The information in the request body uses the `application/json` content type while the information in the response body uses the `text/plain` content type.

| Request Method | Request URL         | Request Body                 | Response Status | Response Body                   |
|----------------|---------------------|------------------------------|-----------------|---------------------------------|
| `GET`          | `/books/9000`       | N/A                          | `404`           | `Not Found`                     |
| `GET`          | `/books/-1`         | N/A                          | `404`           | `Not Found`                     |
| `GET`          | `/books/one`        | N/A                          | `404`           | `Not Found`                     |
| `POST`         | `/books`            | `{ "title": "", ... }`       | `400`           | `Title must not be blank`       |
| `POST`         | `/books`            | `{ "author": "", ... }`      | `400`           | `Author must not be blank`      |
| `POST`         | `/books`            | `{ "genre": "", ... }`       | `400`           | `Genre name must not be blank`  |
| `POST`         | `/books`            | `{ "description": "", ... }` | `400`           | `Description must not be blank` |
| `POST`         | `/books`            | `{ "coverUrl": "", ... }`    | `400`           | `Cover URL must not be blank`   |
| `PATCH`        | `/books/9000`       | N/A                          | `404`           | `Not Found`                     |
| `PATCH`        | `/books/-1`         | N/A                          | `404`           | `Not Found`                     |
| `PATCH`        | `/books/one`        | N/A                          | `404`           | `Not Found`                     |
| `DELETE`       | `/books/9000`       | N/A                          | `404`           | `Not Found`                     |
| `DELETE`       | `/books/-1`         | N/A                          | `404`           | `Not Found`                     |
| `DELETE`       | `/books/one`        | N/A                          | `404`           | `Not Found`                     |

You can run the following test suite to verify the middleware works as expected.

```shell
npm test test/part2.routes.bonus.test.js
```

**NOTE:** Ensure the middleware handles the previous HTTP requests as before.

## Bonus

Using your preferred ESLint rules, lint your project with the `npm run lint .` command.

## Bonus

Once you're satisfied, find a classmate and see if that person would like some help.

#### [⇐ Previous](1_migrations_seeds.md) | [Next ⇒](3_user_registration.md)
