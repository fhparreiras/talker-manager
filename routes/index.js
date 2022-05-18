const express = require('express');
const { talkField, validation, validatePersonalData, 
  validateRate, validateToken } = require('../middlewares');
const { readContent } = require('../services/readContent');
const { tokenGenerator } = require('../services/tokenGenerator');
const { writeContent } = require('../services/writeContent');

const routes = express.Router();

routes.get('/talker', (request, response) => {
  response.status(200).json(readContent('talker.json'));
});

routes.get('/talker/:id', (req, res) => {
  const { id } = req.params;

  const content = (readContent('talker.json'));
  const user = content.filter((u) => u.id === parseInt(id, 10));

  if (user.length === 0) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(user[0]);
});

routes.post('/login', validation, (req, res) => {
  const token = tokenGenerator();
    return res.status(200).json({ token });
});

routes.post('/talker', validateToken, validatePersonalData, talkField,
  validateRate, (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talkersList = readContent('talker.json');
  const newTalker = { name, age, id: talkersList.length + 1, talk: { watchedAt, rate } };
  talkersList.push(newTalker);
  // console.log('talkersLIST 2: ', talkersList);
  writeContent('talker.json', newTalker);

  return res.status(201).json([newTalker]);
});

module.exports = routes;
