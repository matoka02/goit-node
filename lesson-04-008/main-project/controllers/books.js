const { Book } = require("../models/book");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, resp) => {
  // console.log(req.user);
  const {_id: owner} = req.user;
  // console.log(req.query);
  const {page = 1, limit = 10} = req.query;
  const skip = (page -1) * limit;
  // 1.1 поиск без авторизации
  // const result = await Book.find({}, "-createdAt -updatedAt");
  // 1.2 поиск объектов, созданных конкретным пользователем с указанием его id
  // const result = await Book.find({owner}, "-createdAt -updatedAt");
  // 1.3 поиск объектов, созданных конкретным пользователем с указанием всех его данных
  // const result = await Book.find({owner}, "-createdAt -updatedAt").populate('owner');
  // 1.4 поиск объектов, созданных конкретным пользователем с указанием конкретных данных по нему
  // const result = await Book.find({owner}, "-createdAt -updatedAt").populate('owner', 'name email');
  // 1.5 поиск объектов, созданных конкретным пользователем, с добавлением пагинации (указать {skip: 2, limit: 2} или произвести рачет)
  const result = await Book.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate('owner', 'name email');  
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
  const {_id: owner} = req.user;
  // const result = await Book.create(req.body, owner);
  const result = await Book.create({...req.body, owner});
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
