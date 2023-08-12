const books = require("../models/books");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, resp) => {
  const respult = await books.getAll();
  resp.json(respult);
};

const getById = async (req, resp) => {
  const { id } = req.params;
  const respult = await books.getById(id);
  if (!respult) {
    throw HttpError(404, "Not found");
  }
  resp.json(respult);
};

const add = async (req, resp) => {
  const respult = await books.add(req.body);
  resp.status(201).json(respult);
};

const updateById = async (req, resp) => {
  const { id } = req.params;
  const respult = await books.updateById(id, req.body);
  if (!respult) {
    throw HttpError(404, "Not found");
  }
  resp.json(respult);
};

const deleteById = async (req, resp) => {
  const { id } = req.params;
  const respult = await books.deleteById(id);
  if (!respult) {
    throw HttpError(404, "Not found");
  }
  // resp.status(204).send()
  resp.json({
    message: "Delete success",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
