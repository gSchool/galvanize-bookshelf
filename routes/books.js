'use strict'
const express = require('express');
const knex = require('../knex');
// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE

router.get('/books', (req, res) => {
    knex('books')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
});
// beforeEach((done)=> knex.migrate.)

router.get('/books/:id', (req, res) => {
    const id = req.params.id;

    knex('books')
        .where({
            'id': id
        })
        .first()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
});

router.post('/books', (req, res, next) => {

    knex('books')
        .insert({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            description: req.body.description,
            cover_url: req.body.cover_url
        }, '*')
        .then((result) => {
            res.send(result[0]);
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
});

router.patch('/books/:id', (req, res, next) => {
    knex('books')
        .update({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            description: req.body.description,
            cover_url: req.body.cover_url
        }, '*')
        .where('id', req.params.id)
        .then((result) => {
            res.send(result[0]);
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
});

router.delete('/books/:id', (req, res, next) => {
    knex('books')
        .del()
        .where('id', req.params.id)
        .then((result) => {
            res.send(result[0]);
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
});

module.exports = router;
