#### [⇐ Previous](3_user_registration.md) | [Next ⇒](5_user_authorization.md)

# User Authentication

In this assignment, you'll build an authentication system for your RESTful, database-driven, HTTP server.

## Routes

In the `routes/token.js` module, add middleware to handle the following HTTP requests and send back the associated HTTP response. The information in both the request body and response body use the `application/json` content type.

| Request Method | Request URL | Request Body                                                     | Response Status | Response Body                                    | Set-Cookie      |
|----------------|-------------|------------------------------------------------------------------|-----------------|--------------------------------------------------|-----------------|
| `GET`          | `/token`    | N/A                                                              | `200`           | `false`                                          | N/A             |
| `POST`         | `/token`    | `{ "email": "jkrowling@gmail.com", "password": "youreawizard" }` | `200`           | `{ id: 1, "email": "jkrowling@gmail.com", ... }` | token=eyJhbG... |
| `GET`          | `/token`    | N/A                                                              | `200`           | `true`                                           | N/A             |
| `DELETE`       | `/token`    | N/A                                                              | `200`           | `true`                                           | token=          |

**NOTE:** The second `GET /token` request assumes a token was created by the previous `POST /token` request. Also, don't send the user's password or hashed password in the response body.

Additionally, ensure the `POST /token` middleware handles the following HTTP requests and sends back the associated HTTP response. The information in the request body uses the `application/json` content type while the information in the response body uses the `text/plain` content type.

| Request Method | Request URL | Request Body                                                     | Response Status | Response Body           |
|----------------|-------------|------------------------------------------------------------------|-----------------|-------------------------|
| `POST`         | `/token`    | `{ "email": "bad.email@gmail.com", "password": "youreawizard" }` | `400`           | `Bad email or password` |
| `POST`         | `/token`    | `{ "email": "jkrowling@gmail.com", "password": "badpassword" }`  | `400`           | `Bad email or password` |

You can run the following test suite to verify the middleware works as expected.

**NOTE** The token is assumed to be stored in a cookie called `token`.

```shell
npm test test/part4.routes.token.test.js
```

## Bonus

In the `routes/token.js` module, update the middleware to handle the following HTTP requests and send back the associated HTTP response. The information in the request body uses the `application/json` content type while the information in the response body uses the `text/plain` content type.

| Request Method | Request URL | Request Body              | Response Status | Response Body                |
|----------------|-------------|---------------------------|-----------------|------------------------------|
| `POST`         | `/token`    | `{ "email": "", ... }`    | `400`           | `Email must not be blank`    |
| `POST`         | `/token`    | `{ "password": "", ... }` | `400`           | `Password must not be blank` |

You can run the following test suite to verify the middleware works as expected.

```shell
npm test test/part4.routes.token.bonus.test.js
```

**NOTE:** Ensure the middleware handles the previous HTTP requests as before.

## Bonus

In the `routes/users.js` module, update the middleware to handle the following HTTP requests and send back the associated HTTP response. The information in both the request body and response body use the `application/json` content type.

| Request Method | Request URL        | Request Body                                                                                                        | Response Status | Response Body                                                  | Set-Cookie      |
|----------------|--------------------|---------------------------------------------------------------------------------------------------------------------|-----------------|----------------------------------------------------------------|-----------------|
| `POST`         | `/users`           | `{ "first_name": "John", "last_name": "Siracusa", "email": "john.siracusa@gmail.com", "password": "ilikebigcats" }` | `200`           | `{ id: 2, "first_name": "John", "last_name": "Siracusa", ... } | token=eyJhbG... |

You can run the following test suite to verify the middleware works as expected.

```shell
npm test test/part4.routes.users.bonus.test.js
```

**NOTE:** Ensure the middleware handles the previous HTTP requests as before.

## Bonus

Using your preferred ESLint rules, lint your project with the `npm run lint .` command.

## Bonus

Once you're satisfied, find a classmate and see if that person would like some help.

#### [⇐ Previous](3_user_registration.md) | [Next ⇒](5_user_authorization.md)
