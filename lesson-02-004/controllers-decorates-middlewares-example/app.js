const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const booksRouter = require("./routes/api/books");
const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(cors());
// проверка запросов POST на формат записи .json
app.use(express.json());   

app.use("/api/books", booksRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, resp) => {
  resp.status(404).json({ message: 'Not found' })
});

app.use((err, req, resp, next) => {
  const {status = 500, message = "Server error"} = err;
  resp.status(status).json({ message, })
});

module.exports = app;