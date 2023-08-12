const express = require('express');

const ctrl = require('../../controllers/books');
const { validateBody } = require('../../middlewares');
const schemas = require('../../shemas/books');

const router = express.Router();

// рефакторинг, все функции вынесены в /controllers/books.js
router.get('/', ctrl.getAll);

router.get('/:id', ctrl.getById);

// router.post('/', ctrl.add);
router.post('/', validateBody(schemas.addSchema), ctrl.add);

// router.put('/:id', ctrl.updateById);
router.put('/:id', validateBody(schemas.addSchema), ctrl.updateById);

router.delete('/:id', ctrl.deleteById);

module.exports = router;
