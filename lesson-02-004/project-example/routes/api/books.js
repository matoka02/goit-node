const express = require('express');
const Joi = require('joi');

const books = require('../../models/books');

const { HttpError } = require('../../helpers');

const router = express.Router();

// проверка на полноту данных перед отправкой на добавление, нужно установить joi
const addSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
});

router.get('/', async (req, resp) => {
  // использование try-catch, если сервер сломается
  try {
    const result = await books.getAll();
    resp.json(result);
  } catch (error) {
    // resp.status(500).json({
    //   message: 'Server error'
    // })

    // рефакторинг, express пройдется по записям в app, где есть в аргументах ошибка error
    // next(error)     // закомментировано, т.к. ошибка при включении в 2 папках?
  }
});

router.get('/:id', async (req, resp, next) => {
  // console.log(req.params);    // { id: 'YxhM4QDxPeA3SmPHcEZPJ' }
  try {
    const { id } = req.params;
    const result = await books.getById(id);

    if (!result) {
      // // return  resp.status(404).json({
      // //   message: 'Not found'
      // // })
      // рефакторинг, ошибка передается в catch
      // const error = new Error('Not found');
      // error.status = 404;
      // throw error;

      // рефакторинг, вынесено в функцию в helpers/HttpError
      throw HttpError(404, 'Not found')
    };

    resp.json(result);
  } catch (error) {
    // resp.status(500).json({
    //   message: 'Server error'
    // })
    // рефакторинг, ошибка передается в catch
    // const { status = 500, message = 'Server error'} = error;
    // resp.status(status).json({
    //   message,
    // })

    // рефакторинг, в аргументы добавлен next
    next(error)
  }
});

router.post('/', async (req, resp, next) => {
  try {
    // console.log(req.body);    // undefined
    // console.log(req.body);    // { title: 'Worm', author: 'Jhon McCrae' }
    // const result = await books.add(req.body);
    // resp.status(201).json(result)

    // рефакторинг с проверкой
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message)
    };
    const result = await books.add(req.body);
    resp.status(201).json(result)
  } catch (error) {
    next(error)
  }
});

router.put('/:id', async (req, resp, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message)
    };  
    const { id } = req.params;
    const result = await books.updateById(id, req.body);
    if (!result) {
      throw HttpError(404, 'Not found')
    };
    resp.json(result)
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req, resp, next) => {
  try {
    const { id } = req.params;
    const result = await books.deleteById(id);
    // console.log(result);
    if (!result) {
      throw HttpError(404, 'Not found')
    };
    resp.json({
      message: 'Delete successfully'
    });
    // resp.status(204).send();      // не придет тело ответа
  } catch (error) {
    next(error)
  }
});

module.exports = router;
