# User registration

In this assignment, you'll add the necessary code to allow users to register accounts with the system.

## Migrations

Translate the following entity relationship diagram into a Knex migration file.

```text
┌──────────────────────────────────────────────────────────────────┐
│                              users                               │
├────────────────┬─────────────────────────┬───────────────────────┤
│id              │serial                   │primary key            │
│first_name      │varchar(255)             │not null default ''    │
│last_name       │varchar(255)             │not null default ''    │
│email           │varchar(255)             │not null unique        │
|hashed_password |char(60)                 │not null               │
│created_at      │timestamp with time zone │not null default now() │
│updated_at      │timestamp with time zone │not null default now() │
└────────────────┴─────────────────────────┴───────────────────────┘
```

More specifically, the migration file should:

- Live in the `migrations` directory.
- Migrate one table per migration file.
- Pass all the tests when `npm test test/part3.migrations.test.js` is run.

## Routes

Next, update your server to handle the following HTTP request and send the appropriate HTTP response.

**NOTE:** The information in just the request body uses the `application/json` content type.

| Request Method | Request URL        | Request Body                                                                                                        | Response Status | Response Content-Type | Response Body |
|----------------|--------------------|---------------------------------------------------------------------------------------------------------------------|-----------------|-----------------------|---------------|
| `POST`         | `/users`           | `{ "first_name": "John", "last_name": "Siracusa", "email": "john.siracusa@gmail.com", "password": "ilikebigcats" }` | `200`           | `text/plain`          | `OK`          |

In the `routes/users.js` module, add the necessary middleware to handle above RESTful route table. Make sure the route handler securely registers new users using the following techniques.

- Only store a cryptographic hash of the password in the database.
- Do _not_ send the new user's password or hashed password in the response body.

You can run the following test suite to verify the positive case when the middleware responds with a `200` status code.

```shell
npm test test/part3.routes.users.test.js
```

## Bonus

Next, update your server to handle the following problem HTTP requests and send the appropriate HTTP response.

**NOTE:** The information in just the request body uses the `application/json` content type.

| Request Method | Request URL        | Request Body                                                                                                        | Response Status | Response Content-Type | Response Body                |
|----------------|--------------------|---------------------------------------------------------------------------------------------------------------------|-----------------|-----------------------|------------------------------|
| `POST`         | `/users`           | `{ "first_name": "John", "last_name": "Siracusa", "password": "ilikebigcats" }`                                     | `400`           | `text/plain`          | `Email must not be blank`    |
| `POST`         | `/users`           | `{ "first_name": "John", "last_name": "Siracusa", "email": "john.siracusa@gmail.com" }`                             | `400`           | `text/plain`          | `Password must not be blank` |
| `POST`         | `/users`           | `{ "first_name": "John", "last_name": "Siracusa", "email": "john.siracusa@gmail.com", "password": "ilikebigcats" }` | `400`           | `text/plain`          | `Email already exists`       |

In the `routes/users.js` module, update the necessary middleware to handle above RESTful route table. Make sure the route handler continues to securely register new users as before.

You can run the following test suite to verify the negative cases when the middleware responds with a `400` status code.

```shell
npm test test/part3.routes.users.test.js
```
