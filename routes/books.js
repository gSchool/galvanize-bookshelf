'use strict';

const express = require('express');
const knex = require('../knex.js');
 const router = express.Router();

// YOUR CODE HERE
router.get('/books',(req,res,next)=>{
  return knex('books')
  .orderBy('title', 'ASC')
.select('id','title','author','genre','description','cover_url AS coverUrl', 'created_at AS createdAt', 'updated_at AS updatedAt')
.then((books)=>{
  res.send(books)
    })
  .catch((err)=> {
    next(err)
})
});

router.get('/books/:id',(req,res,next)=> {
  return knex('books')
  .select('id','title','author','genre','description','cover_url AS coverUrl', 'created_at AS createdAt', 'updated_at AS updatedAt').first()
  .where('id', req.params.id)
  .then(book =>{
    if(!book){
      return next(err)
    }
    res.send(book)
  })
  .catch((err)=>{
    next(err)
  })
})

router.post('/books', (req,res,next)=>{
 return knex('books')
  .insert({title : req.body.title,
          author: req.body.author,
          genre: req.body.genre,
          description: req.body.description,
          cover_url:req.body.coverUrl },'*')
        .then((book)=>{
          const newBook = {
          id: book[0].id,
          title: book[0].title,
          author: book[0].author,
          genre: book[0].genre,
          description: book[0].description,
          coverUrl :book[0].cover_url

        }
        res.status(200).send(newBook)
        })
        .catch((err)=>{
          next(err)
        })
})

router.patch('/books/:id', (req,res,next)=>{
      return knex('books')
        .where('id', req.params.id)
      .first()
      .update({title : req.body.title,
              author: req.body.author,
              genre: req.body.genre,
             description: req.body.description,
            cover_url:req.body.coverUrl})

          .returning(['id','title','author','genre','description','cover_url AS coverUrl'])
  // })
  .then(updatedBook =>{
  res.send(updatedBook[0])
  })
  .catch((err)=>{
    next(err)
  })
})

router.delete('/books/:id',(req,res,next)=>{
  let rows = ['title','author','genre','description','cover_url AS coverUrl']
  knex('books')
  .where('id',req.params.id)
  .del()
  .first(rows)
  .then((deleted)=>{
    console.log(deleted)
    res.status(200).send(deleted)
  })

});



module.exports = router;
