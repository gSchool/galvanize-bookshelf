# Heroku Deployment

In this assignment, you'll deploy your database-drive, HTTP server to Heroku. Once your application is deployed, add its URL to your Github repository.

Remember to generate a secret key that'll be used to sign session information on the production environment.

```shell
bash -c 'heroku config:set SESSION_SECRET=$(openssl rand -hex 64)'
```

![How to set a Github URL](images/github_url.png)
