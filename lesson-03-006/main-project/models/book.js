const {Schema, model} = require('mongoose');

// создание схемы - первичная и обязательная проверка, остальные пакеты можно удалить, если ее максимально настроить
// const bookSchema = new Schema({
//   title: String,
//   author: String,
// });

// рефакторинг 
const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  favorite: {
    type: Boolean,
    // параметр по умолчанию, если не указано сразу
    default: false    
  },
  genre: {
    type: String, 
    // паометр обязателен, выбрать из списка
    enum: ['fantastic', 'love'], 
    required: true,
  },
  date: {
    type: String,
    // формат строки
    match: /^\d{2}-\d{2}-\d{4}$/, 
    required: true,
  }
});


// создание модели (название коллекции только в ед.ч.)
const Book = model('book', bookSchema);

module.exports = Book;