const express = require('express');

const books = require('../../models/books')

const router = express.Router();

router.get('/', async(req, resp) => {
  const result = await books.getAll();
  resp.json(result);
});





module.exports = router;
