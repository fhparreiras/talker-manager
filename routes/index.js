const express = require('express');
const { readContent } = require('../helpers/readContent');

// const fs = require('fs');

const routes = express.Router();

// const talkerData = fs.readFile('talker.json');

routes.get('/talker', (request, response, next) => {
  response.status(200).json(readContent('talker.json'));
  next();
});

routes.get('/talker/:id', (req, res) => {
  const { id } = req.params;

  const user = readContent('talker.json').filter((u) => u.id === parseInt(id, 10));

  if (user.length === 0) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(user[0]);
});

module.exports = routes;
