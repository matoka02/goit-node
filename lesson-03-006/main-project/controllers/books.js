// const Book = require("../models/book");
const {Book} = require("../models/book");

const { HttpError, ctrlWrapper } = require("../helpers");
// const { ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  // вариант полного поиска
  const result = await Book.find({});
  // вариант поиска по опред.параметрам
  // const result = await Book.find({}, 'title author');
  // вариант поиска без выдачи опред.параметров
  // const result = await Book.find({}, '-createdAt -updatedAt');
  res.json(result);
};

const getById = async (req, res) => {
    const { id } = req.params;
    // поиск 1 объекта по 1 параметру (не только id)
    // const result = await Book.findOne({_id: id});
    // поиск только по id
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

// const updateById = async (req, res) => {
//     const { id } = req.params;
//     const result = await books.updateById(id, req.body);
//     if (!result) {
//         throw HttpError(404, "Not found");
//     }
//     res.json(result);
// };

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
  // updateById: ctrlWrapper(updateById),
  // deleteById: ctrlWrapper(deleteById),
};
