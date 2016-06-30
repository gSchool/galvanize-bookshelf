# User authentication

In this assignment, you'll add the necessary code to allow registered users to authenticate with the system.

## Migrations

Translate the following entity relationship diagram into a Knex migration file.

```text
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│                                     users_books                                           │
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

## Bonuses

* Ability to change the order based on query parameter
* Add Search
* Add Privileges to Admin users
