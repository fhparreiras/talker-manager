const express = require('express');
const { validation, validateToken } = require('../middlewares');
const { readContent } = require('../services/readContent');
const { tokenGenerator } = require('../services/tokenGenerator');

const routes = express.Router();

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

routes.post('/login', validation, (req, res) => {
  const token = tokenGenerator();
    res.status(200).json({ token });
});

routes.post('/talker', validateToken, (req, res) => {
  res.status(201);
});

module.exports = routes;
