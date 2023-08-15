const {Schema, model} = require('mongoose');
const Joi = require("joi");

const {handleMongooseError} = require('../middlewares');

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
    default: false    
  },
  genre: {
    type: String, 
    enum: genreList,
    required: true,
  },
  date: {
    type: String,
    match: dateRegeXP,
    required: true,
  }
}, {versionKey: false, timestamps: true});

bookSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  favorite: Joi.boolean(),
  genre: Joi.string().valid(...genreList).required(),
  date: Joi.string().pattern(dateRegeXP).required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const schemas = { addSchema, updateFavoriteSchema };

const Book = model('book', bookSchema);

module.exports = {
  Book,
  schemas
};