# User authentication

In this assignment, you'll add the necessary code to allow registered users to authenticate with the system.

## Migrations

Translate the following entity relationship diagram into a Knex migration file.

```text
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│                                        users_books                                        │
├────────────────┬─────────────────────────┬────────────────────────────────────────────────┤
│id              │serial                   │primary key                                     │
│book_id         │integer                  │not null references books(id) on delete cascade │
|user_id         │integer                  │not null references users(id) on delete cascade │
│created_at      │timestamp with time zone │not null default now()                          │
│updated_at      │timestamp with time zone │not null default now()                          │
└────────────────┴─────────────────────────┴────────────────────────────────────────────────┘
```

More specifically, the migration file should:

- Live in the `migrations` directory.
- Migrate one table per migration file.
- Pass all the tests when `npm test test/part4.migrations.test.js` is run.

## `session` Routes

Next, update your server to handle the following HTTP request and send the appropriate HTTP response.

**NOTE:** The information in just the request body uses the `application/json` content type.

| Request Method | Request URL        | Request Body                                                         | Response Status | Response Content-Type | Response Body  |
|----------------|--------------------|----------------------------------------------------------------------|-----------------|-----------------------|----------------|
| `POST`         | `/session`         | `{ "email": "john.siracusa@gmail.com", "password": "ilikebigcats" }` | `200`           | `text/plain`          | `OK`           |
| `POST`         | `/session`         | `{ "email": "bad.email@gmail.com", "password": "ilikebigcats" }`     | `401`           | `text/plain`          | `Unauthorized` |
| `POST`         | `/session`         | `{ "email": "john.siracusa@gmail.com", "password": "badpassword" }`  | `401`           | `text/plain`          | `Unauthorized` |

In the `routes/session.js` module, add the necessary middleware to handle above RESTful route table.

You can run the following test suite to verify both the positive and the negative cases when the middleware responds with a `200` or `401` status code.

```shell
npm test test/part4.routes.session.test.js
```

## `users_books` Routes

Next, update your server to handle the following HTTP request and send the appropriate HTTP response.

**NOTE:** The information in just the request body uses the `application/json` content type.

| Request Method | Request URL        | Request Body                                                         | Response Status | Response Content-Type | Response Body  |
|----------------|--------------------|----------------------------------------------------------------------|-----------------|-----------------------|----------------|
| `GET`          | `/users/books`     | N/A                                                                  | `200`           | `application/json`    | `[{ }]`        |
| `GET`          | `/users/books/1`   | N/A                                                                  | `200`           | `application/json`    | `{}`           |
| `POST`         | `/users/books/1`   | N/A                                                                  | `200`           | `application/json`    | `{}`           |
| `DELETE`       | `/users/books/1`   | N/A                                                                  | `200`           | `application/json`    | `{}`           |

In the `routes/users_books.js` module, add the necessary middleware to handle above RESTful route table.

You can run the following test suite to verify both the positive and the negative cases when the middleware responds with a `200` or `401` status code.

```shell
npm test test/part4.routes.users_books.test.js
```
