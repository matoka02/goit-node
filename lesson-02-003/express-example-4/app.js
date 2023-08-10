const express = require('express');
const cors = require('cors');

const books = require('./data/books');
const booksRouter = require('./routes/api/books');

const app = express();

app.use(cors());

// рефакторинг, все унесено в routes/api/books.js
// app.get('/api/books', (req, resp) => {
//   resp.json(books)
// });
// app.get('/api/books/:id', (req, resp) => {
//   resp.json(books[0])
// });
// app.post('/api/books', (req, resp) => {
//   resp.json(books[0])  
// });
// app.put('/api/books/:id', (req, resp) => {
//   resp.json(books[0])
// });
// app.delete('/api/books/:id', (req, resp) => {
//   resp.json(books[0])
// });

// шапка адреса '/api/books'
app.use('/api/books', booksRouter)

app.listen(4000);