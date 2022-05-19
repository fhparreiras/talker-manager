const express = require('express');
const { talkField, validation, validatePersonalData, 
  validateRate, validateToken } = require('../middlewares');
const { readContent } = require('../services/readContent');
const { tokenGenerator } = require('../services/tokenGenerator');
const { writeContent } = require('../services/writeContent');

const routes = express.Router();

routes.get('/talker', (request, response, next) => {
  const content = readContent();
  response.status(200).json(content);
  next();
});

routes.get('/talker/search', validateToken, (req, res) => {
  const searchTerm = req.query;
  const talkers = [readContent()];
  if (!searchTerm || searchTerm === '') {
    return res.status(200).json(talkers);
  }
  const filteredTalkers = talkers.filter((talker) => Object.values(talker).includes(searchTerm));
  if (filteredTalkers.length === 0) {
    return res.status(200).json([]);
  } 
  return res.status(200).json(filteredTalkers);
});

routes.get('/talker/:id', (req, res, next) => {
  const { id } = req.params;

  const content = readContent();
  const user = content.filter((u) => u.id === parseInt(id, 10));

  if (user.length === 0) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(user[0]);
  next();
});

routes.post('/login', validation, (req, res, next) => {
  const token = tokenGenerator();
    res.status(200).json({ token });
    next();
});

routes.post('/talker', validateToken, validatePersonalData, talkField,
  validateRate, async (req, res, next) => {
    try {
      const { name, age, talk: { watchedAt, rate } } = req.body;
      const talkersList = readContent();
      const newTalker = { name, age, id: talkersList.length + 1, talk: { watchedAt, rate } };
      talkersList.push(newTalker);
      const filteredTalker = talkersList.filter((talker) => talker.id === newTalker.id);
      writeContent('./talker.json', filteredTalker); 
      res.status(201).json(filteredTalker[0]);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  next();
});

routes.put('/talker/:id', validateToken, validatePersonalData, talkField, validateRate,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = readContent();
    const talkerIndex = talkers.findIndex((talker) => talker.id === parseInt(id, 10));
    if (talkerIndex === -1) {
      return res.status(400).json({ message: 'Id não encontrado' });
    }
    const teste = { id: Number(talkers[talkerIndex].id), name, age, talk };
    talkers[talkerIndex] = teste;
    const filteredTalker = talkers.filter((talker) => talker.id === talkers[talkerIndex].id);
    console.log('FILTERED: ', filteredTalker);
    writeContent('./talker.json', talkers);
    return res.status(200).send(filteredTalker);
});

routes.delete('/talker/:id', validateToken, (req, res) => {
  const { id } = req.params;
  const talkers = readContent();
  const talkerIndex = talkers.findIndex((talker) => talker.id === parseInt(id, 10));
    if (talkerIndex === -1) {
      return res.status(404).json({ message: 'Id não encontrado' });
    }
    talkers.splice(talkerIndex, 1);
    writeContent('./talker.json', talkers);
    return res.status(204).send();
});

module.exports = routes;
