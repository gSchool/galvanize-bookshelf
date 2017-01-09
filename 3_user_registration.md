#### [⇐ Previous](2_express_knex.md) | [Next ⇒](4_user_authentication.md)

# User Registration

In this assignment, you'll build a user registration system for your RESTful, database-driven, HTTP server.

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

You can run the following test suite to verify the migration file works as expected.

```shell
npm test test/part3.migrations.test.js
```

## Seeds

Translate the following [JavaScript entity](https://gist.github.com/ryansobol/e1113da9ff1486c04f6175a35f975b65) into a Knex seed file. You can run the following test suite to verify the seed file works as expected.

```shell
npm test test/part3.seeds.test.js
```

## Routes

In the `routes/users.js` module, add middleware to handle the following HTTP requests and send back the associated HTTP response. The information in both the request body and response body use the `application/json` content type.

| Request Method | Request URL        | Request Body                                                                                                        | Response Status | Response Body                                                  |
|----------------|--------------------|---------------------------------------------------------------------------------------------------------------------|-----------------|----------------------------------------------------------------|
| `POST`         | `/users`           | `{ "first_name": "John", "last_name": "Siracusa", "email": "john.siracusa@gmail.com", "password": "ilikebigcats" }` | `200`           | `{ id: 2, "first_name": "John", "last_name": "Siracusa", ... } |

**NOTE:** Only store a cryptographic hash of the password in the database. And don't send the new user's password or hashed password in the response body.

You can run the following test suite to verify the middleware works as expected.

```shell
npm test test/part3.routes.test.js
```

## Bonus

After migrating and seeding the `bookshelf_dev` database, start an HTTP server.

```shell
npm start
```

And open the sign up page.

```shell
open http://localhost:8000/signup.html
```

Then, play around with the live application by registering a new user. As you play, take a peek at the code for the client application and familiarize yourself with the following techniques.

- How the HTML files scaffold the base structure and content that's presented on page load.
- How the JavaScript files modify this structure and content as a result of AJAX requests.
- How the CSS files customize the look-and-feel of the structure and content.

**TIP:** It's important to remember how these techniques work because you'll be building both a server application and a client application for your Q2 Project.

## Bonus

In the `routes/users.js` module, update the middleware to handle the following HTTP requests and send back the associated HTTP response. The information in the request body uses the `application/json` content type while the information in the response body uses the `text/plain` content type.

| Request Method | Request URL        | Request Body                              | Response Status | Response Body                                 |
|----------------|--------------------|-------------------------------------------|-----------------|-----------------------------------------------|
| `POST`         | `/users`           | `{ email: "", ... }`                      | `400`           | `Email must not be blank`                     |
| `POST`         | `/users`           | `{ password: "", ... }`                   | `400`           | `Password must be at least 8 characters long` |
| `POST`         | `/users`           | `{ "email": "jkrowling@gmail.com", ... }` | `400`           | `Email already exists`                        |

You can run the following test suite to verify the middleware works as expected.

```shell
npm test test/part3.routes.bonus.test.js
```

**NOTE:** Ensure the middleware handles the previous HTTP requests as before.

## Bonus

Using your preferred ESLint rules, lint your project with the `npm run lint .` command.

## Bonus

Once you're satisfied, find a classmate and see if that person would like some help.

#### [⇐ Previous](2_express_knex.md) | [Next ⇒](4_user_authentication.md)
