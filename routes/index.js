const express = require('express');
const { talkField, validation, validatePersonalData, 
  validateRate, validateToken } = require('../middlewares');
const { readContent } = require('../services/readContent');
const { tokenGenerator } = require('../services/tokenGenerator');
const { writeContent } = require('../services/writeContent');

const routes = express.Router();

routes.get('/talker', (request, response) => {
  const content = readContent('./talker.json');
  response.status(200).json(content);
});

routes.get('/talker/:id', (req, res, next) => {
  const { id } = req.params;

  const content = readContent('talker.json');
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
      const talkersList = readContent('./talker.json');
      const newTalker = { name, age, id: talkersList.length + 1, talk: { watchedAt, rate } };
      talkersList.push(newTalker);
      writeContent('./talker.json', ...talkersList, newTalker); 
      res.status(201).json([newTalker]);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  next();
});

routes.put('/talker/:id', validateToken, validatePersonalData, talkField, validateRate,
  (req, res) => {
    const { id } = req.params;
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const talkers = readContent('./talker.json');
    console.log('TALKERS: ', talkers);
    const talkerIndex = [talkers].findIndex((talker) => talker.id === parseInt(id, 10));
    if (talkerIndex === -1) {
      return res.status(400).json({ message: 'Id não encontrado' });
    }
    
    talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk: { watchedAt, rate } };
    return res.status(200).json([]);
});

routes.delete('/talker/:id', validateToken, (req, res) => {
  const { id } = req.params;
  const talkers = readContent('talker.json');
  const talkerIndex = [talkers].findIndex((talker) => talker.id === parseInt(id, 10));
    if (talkerIndex === -1) {
      console.log('talker: ', talkers);
      return res.status(404).json({ message: 'Id não encontrado' });
    }
    talkers.splice(talkerIndex, 1);
    return res.status(204);
});

module.exports = routes;
