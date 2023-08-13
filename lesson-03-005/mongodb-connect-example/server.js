// const app = require('./app');

// app.listen(4000, ()=>{
//   console.log('Server running. Use our API on port: 4000');
// })

// с подключением через mongoose
const mongoose = require("mongoose");

const app = require('./app');

// const DB_HOST = `mongodb+srv://matoka:8FWnSc0ASo3vOaWX@cluster0.cfo46i6.mongodb.net/books_reader?retryWrites=true&w=majority`;

// 1.1 рефакторинг, перенос в ./config.js
// const {DB_HOST} = require('./config');

// дохрена сведений о настройкая ПК
// console.log(process.env);

// 1.2 рефакторинг, чтобы работало на сервере (ключ-ссылка хранится там)
// const {DB_HOST} = process.env;

// 1.3 рефакторинг: установка dotenv, перенос ключ-ссылки в ./env
const {DB_HOST, PORT = 4000} = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT))
  .catch((error) => {
    console.error(error.message);
    process.exit(1)
  });
