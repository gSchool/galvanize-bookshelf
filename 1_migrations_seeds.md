#### [⇐ Previous](README.md) | [Next ⇒](2_express_knex.md)

# Knex Migrations and Seeds

For this assignment, your task is to build a web application to manage a book collection. In the first part, you'll lay the foundation by creating Knex migration and seed files. Start by forking and cloning this repository to your development environment.

Then, install the necessary dependencies via NPM.

```shell
cd galvanize-bookshelf
npm install
```

Next, ensure there's a PostgreSQL server running on your machine and create both a development and a test database.

```shell
createdb bookshelf_dev
createdb bookshelf_test
```

Next, open the project in your text editor.

```shell
atom .
```

And, update the `knexfile.js` file with the following connection information for each environment.

```javascript
'postgres://localhost/bookshelf_dev'
'postgres://localhost/bookshelf_test'
```

Then, generate a cryptographic key that'll be used for the JWT signature. You'll learn what a JWT is and why it's signed in an upcoming lesson.

```shell
bash -c 'echo "JWT_KEY="$(openssl rand -base64 64)' > .env
```

Finally, ensure the test suite can connect to the right database.

```shell
npm test test/part1.migrations.test.js
```

The tests will not pass, but if you cannot connect to the test database, you'll get the following error.

```text
Knex:warning - Pool2 - Error: Pool was destroyed
Knex:Error Pool2 - error: database "bookshelf_tes" does not exist
```

## Migrations

Translate the following entity relationship diagram into a Knex migration file.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                          books                                           │
├─────────────┬─────────────────────────┬──────────────────────────────────────────────────┤
│id           │serial                   │primary key                                       │
│title        │varchar(255)             │not null default ''                               │
│author       │varchar(255)             │not null default ''                               │
│genre        │varchar(255)             │not null default ''                               │
│description  │text                     │not null default ''                               │
│cover_url    │text                     │not null default ''                               │
│created_at   │timestamp with time zone │not null default now()                            │
│updated_at   │timestamp with time zone │not null default now()                            │
└─────────────┴─────────────────────────┴──────────────────────────────────────────────────┘
```

You can run the following test suite to verify the migration file works as expected.

```shell
npm test test/part1.migrations.test.js
```

You do not need to run the migrations, the tests will take care of that.

## Seeds

Translate the following [JavaScript entities](https://gist.github.com/ryansobol/fb74ad1e3090b1ce5abdc0d30ae154e8) into a Knex seed file. You can run the following test suite to verify the seed file works as expected.

```shell
npm test test/part1.seeds.test.js
```

**TIP:** Postgres keeps track of the sequences for any of the incrementing serial id columns in its tables.  Doing a describe on a table will show the name of the sequence it is using in the modifiers column.  When data is inserted with the id hardcoded, which is often desirable with test data, the sequence will not be aware of this.  So, it's important to advance the sequence to the last id.  An example alter statement to do this would be:

```sql
SELECT setval('books_id_seq', (SELECT MAX(id) FROM books));
```

Using the knex.raw method you can execute a command like this as the last part of the seed data import sequence.  Remember the async nature of javascript and knex when deciding where to use this method.

## Bonus

Using your preferred ESLint rules, lint your project with the `npm run lint .` command.

**TIP:** If you use the builtin `eslint-config-ryansobol` rules, you may want to disable the `camelcase` and `max-len` rules with [inline comments](http://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments) where appropriate.

## Bonus

Play around with a live version of [Galvanize Bookshelf](https://ryansobol-galvanize-bookshelf.herokuapp.com). By the end of this series of assignments, you'll have built a server application to support this client application.

Then, take a peek at the code for the client application. It lives in the `public` directory of this project. As you read over the code, familiarize yourself with the following techniques.

- How the HTML files scaffold the base structure and content that's presented on page load.
- How the JavaScript files modify this structure and content as a result of AJAX requests.
- How the CSS files customize the look-and-feel of the structure and content.

**TIP:** It's important to remember how these techniques work because you'll be building both a server application and a client application for your Q2 Project.

## Bonus

Once you're satisfied, find a classmate and see if that person would like some help.

#### [⇐ Previous](README.md) | [Next ⇒](2_express_knex.md)
