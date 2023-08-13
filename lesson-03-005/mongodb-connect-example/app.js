const mongoose = require('mongoose');

const PASSWORD = "8FWnSc0ASo3vOaWX";
const MY_BASE = "books_reader";
// const DB_HOST = `mongodb+srv://matoka:${PASSWORD}@cluster0.cfo46i6.mongodb.net/${MY_BASE}?retryWrites=true&w=majority`;
const DB_HOST = 'mongodb+srv://matoka:8FWnSc0ASo3vOaWX@cluster0.cfo46i6.mongodb.net/books_reader?retryWrites=true&w=majority'

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connect success"))
  .catch((error) => console.error(error.message));
