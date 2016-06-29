# User Registration

In this assignment, you'll add the necessary code to allow users to register accounts with the system.

## Migrations

Translate the following entity relationship diagram into a Knex migration file.

```text
┌───────────────────────────────────────────────────────────────┐
│                              users                            │
├─────────────┬─────────────────────────┬───────────────────────┤
│id           │serial                   │primary key            │
│first_name   │varchar(255)             │not null default ''    │
│last_name    │varchar(255)             │not null default ''    │
│email        │varchar(255)             │not null default ''    │
│password     │varchar(255)             │not null default ''    │
│created_at   │timestamp with time zone │not null default now() │
│updated_at   │timestamp with time zone │not null default now() │
└─────────────┴─────────────────────────┴───────────────────────┘
```

More specifically, the migration file should:

- Live in the `migrations` directory.
- Migrate one table per migration file.
- Pass all the tests when `npm test test/part3.migrations.test.js` is run.

## Routes

Then, add the correct route to create a new user. Make sure to follow recommended security practices for user registration.

| Request Method | Request URL        | Request Body                                                                                                    | Response Status | Response Content-Type | Response Body                                                                                                                              |
|----------------|--------------------|-----------------------------------------------------------------------------------------------------------------|-----------------|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| `POST`         | `/users`           | `{ "first_name": "Jim", "last_name": "Carrey", "email": "jim.carrey@themask.com", "password": "to_be_hashed" }` | `200`           | `application/json`    | `{ "id": 1, "first_name": "Jim", "last_name": "Carrey", "email": "jim.carrey@themask.com", "created_at": "now()", "updated_at": "now()" }` |                                      |

- The password is stored as a cryptographic hash
- The response body does not contain the newly created user's password or hash

You can run the following test suite to verify the positive case when each middleware responds with a `200` status code.

```shell
npm test test/part3.routes.users.test.js
```
