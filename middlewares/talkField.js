const checkDate = require('../services/checkDate.js');

const talkField = (req, res, next) => {
  const { talk } = req.body;
  // const { name, age, talk: { watchedAt, rate } } = req.body;
  if (!talk || !talk.watchedAt || !talk.rate) {
    const errorMessage = { status: 400, 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' };
    throw errorMessage;
  }
  if (checkDate(talk.watchedAt) !== 3) {
    const errorMessage = { status: 400, 
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
    throw errorMessage;
  }
  next();
};

module.exports = talkField;