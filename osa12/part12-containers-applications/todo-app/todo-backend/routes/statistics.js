const express = require('express');
const { getAsync } = require('../redis');

const router = express.Router();

/* GET statistics data. */
router.get('/', async (_, res) => {
  const addedTodos = parseInt(await getAsync('added_todos')) || 0;

  res.send({
    added_todos: addedTodos
  });
});

module.exports = router;