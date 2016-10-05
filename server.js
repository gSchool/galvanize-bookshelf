'use strict';

if (process.env.NODE_ENV !== `production`) {
  require(`dotenv`).config();
}

const express = require(`express`);
const app = express();

app.disable(`x-powered-by`);

const bodyParser = require(`body-parser`);
const cookieSession = require(`cookie-session`);
const morgan = require(`morgan`);

switch (app.get(`env`)) {
  case `development`:
    app.use(morgan(`dev`));
    break;

  case `production`:
    app.use(morgan(`short`));
    break;

  default:
}

app.use(bodyParser.json());
app.use(cookieSession({
  name: `bookshelf`,
  secret: process.env.SESSION_SECRET,
  secureProxy: app.get(`env`) === `production`
}));

const path = require(`path`);

app.use(express.static(path.join(`public`)));

// CSRF protection
app.use((req, res, next) => {
  if (/json/.test(req.get(`Accept`))) {
    return next();
  }

  res.sendStatus(406);
});

const books = require(`./routes/books`);
const favorites = require(`./routes/favorites`);
const session = require(`./routes/session`);
const users = require(`./routes/users`);

app.use(`/books`, books);
app.use(`/favorites`, favorites);
app.use(`/session`, session);
app.use(`/users`, users);

app.use((_req, res) => {
  res.sendStatus(404);
});

// eslint-disable-next-line max-params
app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set(`Content-Type`, `text/plain`)
      .send(err.message);
  }

  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.sendStatus(500);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  if (app.get(`env`) !== `test`) {
    // eslint-disable-next-line no-console
    console.log(`Listening on port`, port);
  }
});

module.exports = app;
