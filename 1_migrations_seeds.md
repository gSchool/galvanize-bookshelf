# Knex Migrations and Seeds

In this assignment, you're going to build a web application that manages a book collection. In the first part, you'll lay the foundation by building a few Knex migration and seed files. Start by forking and cloning this repository to your development environment.

Next, install the necessary dependencies via NPM.

```shell
cd galvanize-bookshelf
npm install
```

Next, ensure there's a PostgreSQL server running on your machine. You could run it as a service or run it as a project-specific server. The choice is yours. Either way, create both a development and a test database.

```shell
createdb bookshelf_dev
createdb bookshelf_test
```

Next, open the project in your text editor.

```shell
atom .
```

And, update the `knexfile.js` file with the connection information for the development and test environments.

```javascript
'postgres://localhost/bookshelf_dev'
'postgres://localhost/bookshelf_test'
```

Finally, ensure the test suite can connect to the right database.

```shell
npm test
```

## Migrations

Translate the following entity relationship diagram into Knex migration files.

```text
┌───────────────────────────────────────────────────────────────┐
│                            authors                            │
├─────────────┬─────────────────────────┬───────────────────────┤
│id           │serial                   │primary key            │
│first_name   │varchar(255)             │not null default ''    │
│last_name    │varchar(255)             │not null default ''    │
│biography    │text                     │not null default ''    │
│portrait_url │text                     │not null default ''    │
│created_at   │timestamp with time zone │not null default now() │
│updated_at   │timestamp with time zone │not null default now() │
└─────────────┴─────────────────────────┴───────────────────────┘
                                ┼
                                │
                                │
                                ○
                               ╱│╲
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                          books                                           │
├─────────────┬─────────────────────────┬──────────────────────────────────────────────────┤
│id           │serial                   │primary key                                       │
│author_id    │integer                  │not null references authors(id) on delete cascade │
│title        │varchar(255)             │not null default ''                               │
│genre        │varchar(255)             │not null default ''                               │
│description  │text                     │not null default ''                               │
│cover_url    │text                     │not null default ''                               │
│created_at   │timestamp with time zone │not null default now()                            │
│updated_at   │timestamp with time zone │not null default now()                            │
└─────────────┴─────────────────────────┴──────────────────────────────────────────────────┘
```

More specifically, the migration files should:

- Live in the `migrations` directory.
- Migrate one table per migration file.
- Pass all the tests when `npm test test/part1.migrations.test.js` is run.

## Seeds

Translate the following [JavaScript entities](https://gist.github.com/ryansobol/fb74ad1e3090b1ce5abdc0d30ae154e8) into Knex seed files. More specifically, the seed files should:

- Live in the `seeds` directory.
- Seed one table per seed file.
- Pass all the tests when `npm test test/part1.seeds.test.js` is run.

## Bonus

Deploy the code to Heroku. More specifically, the deployment should:

- Create a Heroku app called `USERNAME-galvanize-bookshelf` where `USERNAME` is your GitHub username in lowercase.
- Update the `package.json` file with the version of Node from your development environment.
- Enable the Heroku PostgreSQL add-on for your new Heroku app.
- Update the `knexfile.js` file with the `production` database connection information.
- Update the `package.json` file with a `heroku-postbuild` script to migrate the production database.
- Add and commit the changes to your local git repository.
- Push the changes to the master branch of your Heroku remote.
- Seed the production database by running a one-off command on Heroku.
- After about one minute, check that the production database has the correct number of tables and rows.

Once you're satisfied, find a fellow student and see if he or she would like some help.
