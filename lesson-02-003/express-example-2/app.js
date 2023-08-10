const express = require('express');

const app = express();

const books = require('./books');

app.get('/books', (req, resp) => {
  resp.send(books)
})

app.listen(3000);