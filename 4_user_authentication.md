# User Authentication

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

## Seeds

Translate the following [JavaScript entities](https://gist.github.com/ryansobol/0bcc0058af3ce5823263ac005a34b050) into Knex seed files. More specifically, the seed files should:

- Live in the `seeds` directory.
- Seed one table per seed file.
- Pass all the tests when `npm test test/part4.seeds.test.js` is run.

## `session` routes

Next, update your server to handle the following HTTP request and send the appropriate HTTP response.

**NOTE:** The information in just the request body uses the `application/json` content type.

| Request Method | Request URL        | Request Body                                                     | Response Status | Response Content-Type | Response Body  |
|----------------|--------------------|------------------------------------------------------------------|-----------------|-----------------------|----------------|
| `POST`         | `/session`         | `{ "email": "jkrowling@gmail.com", "password": "youreawizard" }` | `200`           | `text/plain`          | `OK`           |
| `POST`         | `/session`         | `{ "email": "bad.email@gmail.com", "password": "youreawizard" }` | `401`           | `text/plain`          | `Unauthorized` |
| `POST`         | `/session`         | `{ "email": "jkrowling@gmail.com", "password": "badpassword" }`  | `401`           | `text/plain`          | `Unauthorized` |

In the `routes/session.js` module, add the necessary middleware to handle above RESTful route table.

Before you get started, run the following shell command to generate a secret key that's used to sign each cookie session.

**NOTE:** Restart your HTTP server after running the following command.

```shell
openssl rand -hex 64 | ruby -ne 'puts "SESSION_SECRET=" + $_' > .env
```

You can run the following test suite to verify both the positive and the negative cases when the middleware responds with a `200` or `401` status code.

```shell
npm test test/part4.routes.session.test.js
```

## `users_books` routes

Next, update your server to handle the following HTTP request and send the appropriate HTTP response.

**NOTE:** The following routes assume a user where `id = 1` is authenticated.

| Request Method | Request URL        | Response Status | Response Content-Type | Response Body                                                         |
|----------------|--------------------|-----------------|-----------------------|-----------------------------------------------------------------------|
| `GET`          | `/users/books`     | `200`           | `application/json`    | `[{ "id": 1, "author_id": 2, "title": "Python In A Nutshell", ... }]` |
| `GET`          | `/users/books/1`   | `200`           | `application/json`    | `{ "id": 1, "author_id": 2, "title": "Python In A Nutshell", ... }`   |
| `POST`         | `/users/books/2`   | `200`           | `application/json`    | `{ "id": 2, "book_id": 2, "user_id": 1 }`                             |
| `DELETE`       | `/users/books/2`   | `200`           | `application/json`    | `{ "book_id": 2, "user_id": 1 }`                                      |

In the `routes/users_books.js` module, add the necessary middleware to handle above RESTful route table.

You can run the following test suite to verify both the positive and the negative cases when the middleware responds with a `200` or `401` status code.

```shell
npm test test/part4.routes.users_books.test.js
```
