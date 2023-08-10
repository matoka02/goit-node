const express = require("express");
const moment = require('moment');
const fs = require('fs/promises');
const cors = require('cors');

const books = require("./books");

const app = express();

// app.get("/products", (req, resp) => {
//   resp.json([]);
// });

// app.get("/books", (req, resp) => {
//   resp.json(books);
// });


//  1.1 Использование middleware
// app.use((req, resp, next) => {
//   console.log('First middleware');
//   // функция, которая позволяет выполнить поиск дальше
//   next();
// });

// app.get("/products", (req, resp) => {
//   resp.json([]);
// });

// app.get("/books", (req, resp) => {
//   resp.json(books);
// });


// 1.2 Использование middleware для записи логов в public/server.log
// app.use(async(req, resp, next) => {
//   const {method, url} = req;
//   const date = moment().format('DD-MM-YYYY_hh:mm:ss');
//   await fs.appendFile('./public/server.log', `\n${method} ${url} ${date}`);
//   next();
// });

// app.get("/products", async(req, resp) => {
//   resp.json([]);
// });

// app.get("/books", async(req, resp) => {
//   resp.json(books);
// });


// 1.3 Использование middleware для записи в json-формате несуществующих адресов - тогда метод use применить последним

// app.get("/products", async(req, resp) => {
//   resp.json([]);
// });

// app.get("/books", async(req, resp) => {
//   resp.json(books);
// });

// app.use(async(req, resp) => {
//   resp.status(404).json({
//     message: 'Not found'
//   })
// });


// 1.4 Использование middleware для записи в json-формате несуществующих адресов - тогда метод use применить последним

// const corsMiddleware = cors();
// app.use(corsMiddleware);

// рефакторинг в 1 строку
app.use(cors());

app.get("/products", async(req, resp) => {
  resp.json([]);
});

app.get("/books", async(req, resp) => {
  resp.json(books);
});

app.listen(4000);
