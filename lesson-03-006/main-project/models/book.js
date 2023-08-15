const {Schema, model} = require('mongoose');
const Joi = require("joi");

const {handleMongooseError} = require('../helpers');

// создание схемы - первичная и обязательная проверка, остальные пакеты можно удалить, если ее максимально настроить
// const bookSchema = new Schema({
//   title: String,
//   author: String,
// });

const genreList = ['fantastic', 'love'];
const dateRegeXP = /^\d{2}-\d{2}-\d{4}$/;

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
    // enum: ['fantastic', 'love'], 
    enum: genreList,
    required: true,
  },
  date: {
    type: String,
    // формат строки
    // match: /^\d{2}-\d{2}-\d{4}$/, 
    match: dateRegeXP,
    required: true,
  }
  // вместо записи версии передать параметры createdAt и updatedAt
}, {versionKey: false, timestamps: true});

// если запрос не проходит валидацию по схеме, mongoose передаст ошибку, но не статус - добавляем middlewares
// bookSchema.post('save', (error, data, next) => {
//   // console.log(error);
//   error.status = 400;
//   next()
// });

// рефакторинг, вынесено в ./helpers/handleMongooseError.js
bookSchema.post('save', handleMongooseError);

// приносим валидацию joi, чтобы собрать в 1 месте
const addSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  favorite: Joi.boolean(),
  genre: Joi.string().valid(...genreList).required(),
  date: Joi.string().pattern(dateRegeXP).required(),
});

// добавление валидации для putch-метода
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

// объединение схемы валидации
const schemas = { addSchema, updateFavoriteSchema };

// создание модели (название коллекции только в ед.ч.)
const Book = model('book', bookSchema);

// module.exports = Book;
module.exports = {
  Book,
  // addSchema,
  schemas
};