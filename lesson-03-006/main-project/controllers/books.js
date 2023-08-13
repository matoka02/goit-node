// const Book = require("../models/book");
const {Book} = require("../models/book");

// const { HttpError, ctrlWrapper } = require("../helpers");
const { ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Book.find();
  res.json(result);
};

// const getById = async (req, res) => {
//     const { id } = req.params;
//     const result = await books.getById(id);
//     if (!result) {
//         throw HttpError(404, "Not found");
//     }
//     res.json(result);
// };

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
  // getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  // updateById: ctrlWrapper(updateById),
  // deleteById: ctrlWrapper(deleteById),
};
