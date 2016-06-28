# REST interface for user registration

Now that the routes are set up for books and authors, it's time to add the necessary files to allow users to register.

## Migrations

Start off by creating the migration file to define the schema for the users table.

```shell
npm run knex migrate:make users
```

Translate the following entity diagram into a Knex migration file.

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

## User Registration Route

Then, add the correct route to create a new user. Make sure to follow recommended security practices for user registration.

| Request Method | Request URL        | Request Body                                                                                           | Response Status | Response Content-Type | Response Body                                                                                                                               |
|----------------|--------------------|--------------------------------------------------------------------------------------------------------|-----------------|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `POST`         | `/users`           | `{ "first_name": "Jim", "last_name": "Carrey", "email": "jim.carrey@themask.com", "password": "to_be_hashed" }` | `200`           | `application/json`    | `{ "id": 1, "first_name": "Jim", "last_name": "Carrey", "email": "jim.carrey@themask.com", "created_at": "now()", "updated_at": "now()" }`                                      |

- The password is stored as a cryptographic hash
- The response body does not contain the newly created user's password or hash
