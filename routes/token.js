'use strict';
const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const knex = require('../knex');
const { camelizeKeys } = require('humps');
const jwt = require('jsonwebtoken');


// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
router.get('/token', function(req,res,next){
  jwt.verify(req.cookies.token, process.env.JWT_KEY, function(err, decoded){
    // console.log(err, req.cookies);
    if(err) return res.send(false);
    res.send(true)
  })
})

router.post('/token', (req, res, next) => {
  let user;

  const { email, password } = req.body;

  knex('users')
    .where('email', email)
    .first()
    .then((row) => {
      if (!row) {
        // if your throw in a then block, it will go to the catch at the
        // bottom of the promise chain.
        // Also, this is a good example of using boom.
        throw boom.create(400, 'Bad email or password');
      }
      user = camelizeKeys(row);
      return bcrypt.compare(password, user.hashedPassword);
    })

    .then(() => {
      // create JWT
   const claim = { username: "self" };
   const token = jwt.sign(claim, process.env.JWT_KEY, {
       expiresIn: '7 days'
     })
     // create cookie
      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),  // 7 days
        // secure: false
      });
      // before we send back the user object
      // (when we post, we always respond with what was created)
      // we remove the hashed password from the object.
      delete user.hashedPassword;
      secure: router.get('env') === 'production'
      res.send(user);
    })

    .catch(bcrypt.MISMATCH_ERROR, () => { // If the passwords do not match, this code gets executed.
      throw boom.create(400, 'Bad email or password');
    })

    .catch((err) => {
      next(err);
    });
});

router.delete('/token', (req, res) => {
  res.clearCookie('token');
  res.end();
});

function isAuthorized(req, res, next){
  if(!req.cookies.token) return next({statusCode:403});


  jwt.verify(req.cookies.token, process.env.JWT_KEY, function(err, decoded){
    if(err) return next({statusCode:403});
    next()
  })
}

module.exports = router;

//************************************************
