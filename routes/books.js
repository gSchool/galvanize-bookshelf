'use strict';

const express = require('express');
const humps = require('humps');
const router = express.Router();
const knex = require('../knex');

router.get('/books', (req, res, next) => {
    knex('books')
        .orderBy('title', 'asc')
        .then((manybooks) => {
            res.set('Content-Type', 'application/json')
            // console.log(manybooks.camelize);
            res.send(humps.camelizeKeys(manybooks));
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/books/:id', (req, res, next) => {
    console.log('I am here~~~~~again');
    knex('books')
        .orderBy('title', 'asc')
        .where('id', req.params.id)
        .then((onebook) => {
            if (!onebook) {
                return next();
            }
            res.set('Content-Type', 'application/json')
            //console.log(humps.camelizeKeys(onebook[0]));
            res.send(humps.camelizeKeys(onebook[0]));
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/books', (req, res, next) => {
    knex('books')
        .insert({
            id: req.body.id,
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            description: req.body.description,
            cover_url: req.body.coverUrl,
            created_at: req.body.created_at,
            updated_at: req.body.created_at
        }, '*')
        .then((manybooks) => {
            if (!manybooks) {
                return next();
            }
            res.send(humps.camelizeKeys(manybooks[0]));
        })
        .catch((err) => {
            next(err);
        });
});

router.patch('/books/:id', (req, res, next) => {
    knex('books')
        .where('id', req.params.id)
        .then((manybooks) => {
            if (!manybooks) {
                return next();
            }

            return knex('books')
                .update({
                    id: req.body.id,
                    title: req.body.title,
                    author: req.body.author,
                    genre: req.body.genre,
                    description: req.body.description,
                    cover_url: req.body.coverUrl
                }).returning('*')
                .where('id', req.params.id);
        }).then((manybooks) => {
            res.send(humps.camelizeKeys(manybooks[0]));
        })
        .catch((err) => {
            next(err);
        });
});

router.delete('/books/:id', (req, res, next) => {
    knex('books')
        .del()
        .where('id', req.params.id).returning('*')
        .then((deletedbook) => {
            if (!deletedbook) {
                return next();
            }
            return deletedbook;
        })
        .then((deletedbook1) => {
            delete deletedbook1[0].id;
            res.send(humps.camelizeKeys(deletedbook1[0]));
        })
        .catch((err) => {
            next(err);
        });
});



module.exports = router;
