#### [⇐ Previous](5_user_authorization.md) | [Next ⇒](README.md)

# Heroku Deployment

In this assignment, you'll deploy your database-driven application to Heroku.

## Pre-deployment

First, complete the following pre-deployment steps.

1. Create a Heroku app called `USERNAME-galvanize-bookshelf` where `USERNAME` is your GitHub username in lowercase form.
1. Generate a cryptographic key for the JWT signature and set it to the `JWT_KEY` config variable of the new Heroku app.
1. Update the `package.json` file with a dependency to a specific Node.js version.
1. Enable the Heroku PostgreSQL add-on for the new Heroku app.
1. Update the `knexfile.js` file with the `production` database connection information.
1. Update the `package.json` file with a `heroku-postbuild` script to migrate the production database.
1. Add and commit the changes to your local git repository.
1. Push the changes to the `master` branch on GitHub.

## Deployment

Next, complete the following deployment steps.

1. Push the changes to the `master` branch on Heroku.
1. Seed the production database with `npm run knex seeds:run` as a one-off Heroku command.
1. Visit the Heroku app at `https://USERNAME-galvanize-bookshelf.herokuapp.com/`.
1. If the application isn't working, check the production logs with `heroku logs`.
1. Otherwise, celebrate with a beverage of choice!

## Post-deployment

Finally, complete the following post-deployment steps.

1. Add `https://USERNAME-galvanize-bookshelf.herokuapp.com/` to your Github repository's URL.
1. Fix any test errors, including bonus tests, with `npm test`.
1. Fix any linting errors with `npm run lint .`.
1. Submit your solution for grading.

## Bonus

Use the [Heroku Scheduler](https://devcenter.heroku.com/articles/scheduler) add-on to seed the production database with `npm run knex seeds:run` every hour.

## Bonus

Once you're satisfied, find a classmate and see if that person would like some help.

#### [⇐ Previous](5_user_authorization.md) | [Next ⇒](README.md)
