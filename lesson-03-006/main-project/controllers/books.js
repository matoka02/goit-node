// const Book = require("../models/book");
const { Book } = require("../models/book");

const { HttpError, ctrlWrapper } = require("../helpers");
// const { ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  // 1.1 вариант полного поиска
  const result = await Book.find({});
  // 1.2 вариант поиска по опред.параметрам
  // const result = await Book.find({}, 'title author');
  // 1.3 вариант поиска без выдачи опред.параметров
  // const result = await Book.find({}, '-createdAt -updatedAt');
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  // 2.1 поиск 1 объекта по 1 параметру (не только id)
  // const result = await Book.findOne({_id: id});
  // 2.2 поиск только по id
  const result = await Book.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await Book.create(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  // 3.1 вернет запись до изменения
  // const result = await Book.findByIdAndUpdate(id, req.body);
  // 3.2 вернет запись после изменения
  const result = await Book.findByIdAndUpdate(id, req.body, {new: true});
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Book.findByIdAndUpdate(id, req.body, {new: true});
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

// const deleteById = async (req, res) => {
//     const { id } = req.params;
//     const result = await books.deleteById(id);
//     if (!result) {
//         throw HttpError(404, "Not found");
//     }
//     // res.status(204).send()
//     res.json({
//         message: "Delete success"
//     })
// };

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  // deleteById: ctrlWrapper(deleteById),
};
