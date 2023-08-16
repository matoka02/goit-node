const { Book } = require("../models/book");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, resp) => {
  const result = await Book.find({}, "-createdAt -updatedAt");
  resp.json(result);
};

const getById = async (req, resp) => {
  const { id } = req.params;
  // const result = await Book.findOne({_id: id})
  const result = await Book.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  resp.json(result);
};

const add = async (req, resp) => {
  const result = await Book.create(req.body);
  resp.status(201).json(result);
};

const updateById = async (req, resp) => {
  const { id } = req.params;
  const result = await Book.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  resp.json(result);
};

const updateFavorite = async (req, resp) => {
  const { id } = req.params;
  const result = await Book.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  resp.json(result);
};

const deleteById = async (req, resp) => {
  const { id } = req.params;
  const result = await Book.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  resp.json({
    message: "Delete success",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
