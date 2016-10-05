#### [⇐ Previous](3_user_registration.md) | [Next ⇒](5_heroku_deployment.md)

# Authentication and Authorization

In this assignment, you'll build authentication and authorization systems for your RESTful, database-driven, HTTP server.

## Migrations

Translate the following entity relationship diagram into a Knex migration file.

```text
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                         favorites                                               │
├────────────────┬─────────────────────────┬──────────────────────────────────────────────────────┤
│id              │serial                   │primary key                                           │
│book_id         │integer                  │not null references books(id) on delete cascade index │
|user_id         │integer                  │not null references users(id) on delete cascade index │
│created_at      │timestamp with time zone │not null default now()                                │
│updated_at      │timestamp with time zone │not null default now()                                │
└────────────────┴─────────────────────────┴──────────────────────────────────────────────────────┘
```

You can run the following test suite to verify the migration file works as expected.

```shell
npm test test/part4.migrations.test.js
```

## Seeds

Translate the following [JavaScript entity](https://gist.github.com/ryansobol/0bcc0058af3ce5823263ac005a34b050) into a Knex seed file. You can run the following test suite to verify the seed file works as expected.

```shell
npm test test/part4.seeds.test.js
```

## Authentication

In the `routes/token.js` module, add middleware to handle the following HTTP requests and send back the associated HTTP response. The information in both the request body and response body use the `application/json` content type.

| Request Method | Request URL        | Request Body                                                     | Response Status | Response Body                                    |
|----------------|--------------------|------------------------------------------------------------------|-----------------|--------------------------------------------------|
| `GET`          | `/token`         | N/A                                                              | `200`           | `false`                                          |
| `POST`         | `/token`         | `{ "email": "jkrowling@gmail.com", "password": "youreawizard" }` | `200`           | `{ id: 1, "email": "jkrowling@gmail.com", ... }` |
| `GET`          | `/token`         | N/A                                                              | `200`           | `true`                                           |
| `DELETE`       | `/token`         | N/A                                                              | `200`           | `true`                                           |

**NOTE:** The second `GET /token` request assumes a token was created by the previous `POST /token` request. Also, don't send the user's password or hashed password in the response body.

Additionally, ensure the `POST /token` middleware handles the following HTTP requests and sends back the associated HTTP response. The information in the request body uses the `application/json` content type while the information in the response body uses the `text/plain` content type.

| Request Method | Request URL        | Request Body                                                     | Response Status | Response Body                |
|----------------|--------------------|------------------------------------------------------------------|-----------------|------------------------------|
| `POST`         | `/token`         | `{ "email": "bad.email@gmail.com", "password": "youreawizard" }` | `400`           | `Bad email or password`      |
| `POST`         | `/token`         | `{ "email": "jkrowling@gmail.com", "password": "badpassword" }`  | `400`           | `Bad email or password`      |

You can run the following test suite to verify the middleware works as expected.

**NOTE** The token is assumed to be stored in a cookie called `token`.

```shell
npm test test/part4.routes.token.test.js
```

## Authorization

In the `routes/favorites.js` module, add middleware to handle the following HTTP requests and send back the associated HTTP response. The information in both the request body and response body use the `application/json` content type. Assume a token has been created for a user with an `id` of `1`.

| Request Method | Request URL                 | Request Body       | Response Status | Response Body                                        |
|----------------|-----------------------------|--------------------|-----------------|------------------------------------------------------|
| `GET`          | `/favorites`                | N/A                | `200`           | `[{ "id": 1, "bookId": 1, "userId": 1, ... }, ... ]` |
| `GET`          | `/favorites/check?bookId=1` | N/A                | `200`           | `true`                                               |
| `GET`          | `/favorites/check?bookId=2` | N/A                | `200`           | `false`                                              |
| `POST`         | `/favorites`                | `{ "bookId": 2 } ` | `200`           | `{ "id": 2, "bookId": 2, "userId": 1, ... }`         |
| `DELETE`       | `/favorites`                | `{ "bookId": 1 }`  | `200`           | `{ "bookId": 1, "userId": 1, ... }`                  |

Additionally, ensure the middleware handles the following HTTP requests and sends back the associated HTTP response. The information in the request body uses the `application/json` content type while the information in the response body uses the `text/plain` content type. Assume no token has been created.

| Request Method | Request URL                 | Request Body      | Response Status | Response Body     |
|----------------|-----------------------------|-------------------|-----------------|-------------------|
| `GET`          | `/favorites`                | N/A               | `401`           | `Unauthorized`    |
| `GET`          | `/favorites/check?bookId=1` | N/A               | `401`           | `Unauthorized`    |
| `GET`          | `/favorites/check?bookId=2` | N/A               | `401`           | `Unauthorized`    |
| `POST`         | `/favorites`                | `{ "bookId": 2 }` | `401`           | `Unauthorized`    |
| `DELETE`       | `/favorites`                | `{ "bookId": 1 }` | `401`           | `Unauthorized`    |

You can run the following test suite to verify the middleware works as expected.

```shell
npm test test/part4.routes.favorites.test.js
```

## Bonus

After migrating and seeding the `bookshelf_dev` database, start an HTTP server.

```shell
npm start
```

And open the log in page.

```shell
open http://localhost:8000/login.html
```

Then, play around with the live application by logging in a user and viewing their favorite books. As you play, take a peek at the code for the client application and familiarize yourself with the following techniques.

- How the HTML files scaffold the base structure and content that's presented on page load.
- How the JavaScript files modify this structure and content as a result of AJAX requests.
- How the CSS files customize the look-and-feel of the structure and content.

**TIP:** It's important to remember how these techniques work because you'll be building both a server application and a client application for your Q2 Project.

## Bonus

In the `routes/token.js` module, update middleware to handle the following HTTP requests and send back the associated HTTP response. The information in the request body uses the `application/json` content type while the information in the response body uses the `text/plain` content type.

| Request Method | Request URL        | Request Body              | Response Status | Response Body                |
|----------------|--------------------|---------------------------|-----------------|------------------------------|
| `POST`         | `/token`         | `{ "email": "", ... }`    | `400`           | `Email must not be blank`    |
| `POST`         | `/token`         | `{ "password": "", ... }` | `400`           | `Password must not be blank` |

You can run the following test suite to verify the middleware works as expected.

```shell
npm test test/part4.routes.token.bonus.test.js
```

**NOTE:** Ensure the middleware handles the previous HTTP requests as before.

## Bonus

In the `routes/favorites.js` module, update middleware to handle the following HTTP requests and send back the associated HTTP response. The information in the request body uses the `application/json` content type while the information in the response body uses the `text/plain` content type. Assume a token has been created for a user with an `id` of `1`.

| Request Method | Request URL                   | Request Body          | Response Status | Response Body                |
|----------------|-------------------------------|-----------------------|-----------------|------------------------------|
| `GET`          | `/favorites/check?bookId=one` | N/A                   | `400`           | `Book ID must be an integer` |
| `POST`         | `/favorites`                  | `{ "bookId": "two" }` | `400`           | `Book ID must be an integer` |
| `POST`         | `/favorites`                  | `{ "bookId": 9000 }`  | `404`           | `Book not found`             |
| `DELETE`       | `/favorites`                  | `{ "bookId": "one" }` | `400`           | `Book ID must be an integer` |
| `DELETE`       | `/favorites`                  | `{ "bookId": 9000 }`  | `404`           | `Favorite not found`         |

You can run the following test suite to verify the middleware works as expected.

```shell
npm test test/part4.routes.favorites.bonus.test.js
```

**NOTE:** Ensure the middleware handles the previous HTTP requests as before.

## Bonus

Using your preferred ESLint rules, lint your project with the `npm run lint .` command.

## Bonus

Once you're satisfied, find a classmate and see if that person would like some help.

#### [⇐ Previous](3_user_registration.md) | [Next ⇒](5_heroku_deployment.md)
