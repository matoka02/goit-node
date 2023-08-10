const express = require('express');

const ctrl = require('../../controllers/books')

const router = express.Router();

// рефакторинг, все функции вынесены в /controllers/books.js
router.get('/', ctrl.getAll);

router.get('/:id', ctrl.getById);

router.post('/', ctrl.add);

router.put('/:id', ctrl.updateById);

router.delete('/:id', ctrl.deleteById);

module.exports = router;
