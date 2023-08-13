// const app = require('./app');

// app.listen(4000, ()=>{
//   console.log('Server running. Use our API on port: 4000');
// })

const mongoose = require("mongoose");

const app = require('./app');

const DB_HOST = `mongodb+srv://matoka:8FWnSc0ASo3vOaWX@cluster0.cfo46i6.mongodb.net/books_reader?retryWrites=true&w=majority`;

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(4000))
  .catch((error) => {
    console.error(error.message);
    process.exit(1)
  });
