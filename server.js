'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
const books = require('./routes/books');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(books);
app.use(function(req, res) {
    res.send('Hello World');

});

app.listen(port, function() {
    console.log('Listening on port', port);
});
