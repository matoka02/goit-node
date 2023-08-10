const express = require('express');

const app = express();

const books = require('./books');

app.get('/books', (req, resp) => {
  // resp.send(books);
  resp.json(books);

  // метод send не передает значение null, только json
  // const databasePesponce = null;
  // resp.send(databasePesponce);
  // resp.json(databasePesponce);
})

app.listen(4000);