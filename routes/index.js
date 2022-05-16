const express = require('express');
const { readContent } = require('../helpers/readContent');

// const fs = require('fs');

const routes = express.Router();

// const talkerData = fs.readFile('talker.json');

routes.get('/talker', (request, response, next) => {
  response.status(200).json(readContent('talker.json'));
  next();
});

module.exports = routes;
