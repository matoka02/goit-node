const express = require("express");

const books = require("../../data/books");

// const app = express();

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


// рефакторинг, т.к. нельзя 2 раза вызывать api

const router = express.Router();

router.get("/", (req, res)=> {
    res.json(books);
})

router.get("/:id", (req, res)=> {
    res.json(books[0])
})

router.post("/", (req, res)=> {
    res.json(books[0])
})

router.put("/:id", (req, res)=> {
    res.json(books[0])
})

router.delete("/:id", (req, res)=> {
    res.json(books[0])
})

module.exports = router;