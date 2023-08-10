// вызов библиотеки
const express = require("express");

// создание веб-сервера
const app = express();

// // запуск сервера - не указывать 3000, если фронт на нем
// app.listen(4000, () => console.log("Server running"));

// отправка html
app.get('/', (request, responce)=>{
  responce.send(`<h2>Home page</h2>`)
});

app.get('/contacts', (request, responce)=>{
  console.log(request.url);
  console.log(request.method);
  responce.send(`<h2>Contacts page</h2>`)
});

app.listen(4000, () => console.log("Server running"));




