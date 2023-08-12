const books = require("../models/books");

// const { HttpError } = require('../helpers');
const { HttpError, ctrlWrapper } = require("../helpers");

// рефакторинг, вынесено в /shemas/books.js
// const Joi = require("joi");
// const addSchema = Joi.object({
//   title: Joi.string().required(),
//   author: Joi.string().required(),
// });

// const getAll = async (req, resp) => {
//   try {
//     const result = await books.getAll();
//     resp.json(result);
//   } catch (error) {
//     // next(error)
//   }
// };

// const getById = async (req, resp, next) => {
//   try {
//     const { id } = req.params;
//     const result = await books.getById(id);

//     if (!result) {
//       throw HttpError(404, 'Not found')
//     };

//     resp.json(result);
//   } catch (error) {
//     next(error)
//   }
// };

// const add = async (req, resp, next) => {
//   try {
//     const { error } = addSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message)
//     };
//     const result = await books.add(req.body);
//     resp.status(201).json(result)
//   } catch (error) {
//     next(error)
//   }
// };

// const updateById = async (req, resp, next) => {
//   try {
//     const { error } = addSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message)
//     };
//     const { id } = req.params;
//     const result = await books.updateById(id, req.body);
//     if (!result) {
//       throw HttpError(404, 'Not found')
//     };
//     resp.json(result)
//   } catch (error) {
//     next(error)
//   }
// };

// const deleteById = async (req, resp, next) => {
//   try {
//     const { id } = req.params;
//     const result = await books.deleteById(id);
//     if (!result) {
//       throw HttpError(404, 'Not found')
//     };
//     resp.json({
//       message: 'Delete successfully'
//     });
//   } catch (error) {
//     next(error)
//   }
// };

/**
 * 
 * @param {*} req 
 * @param {*} resp 
 */

// рефакторинг, try-catch вынесено отдельной функцией в /helpers/ctrlWrapper.js, фргумент next тоже можно убрать

const getAll = async (req, resp) => {
  const result = await books.getAll();
  resp.json(result);
};

const getById = async (req, resp) => {
  const { id } = req.params;
  const result = await books.getById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  resp.json(result);
};

const add = async (req, resp) => {
  // // рефакторинг, вынесено в /shemas/books.js
  // const { error } = addSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, error.message);
  // };

  const result = await books.add(req.body);
  resp.status(201).json(result);
};

const updateById = async (req, resp) => {
  // // рефакторинг, вынесено в /shemas/books.js
  // const { error } = addSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, error.message);
  // };

  const { id } = req.params;
  const result = await books.updateById(id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  resp.json(result);
};

const deleteById = async (req, resp) => {
  const { id } = req.params;
  const result = await books.deleteById(id);
  if (!result) {
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
