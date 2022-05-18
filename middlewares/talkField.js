const checkDate = require('../services/checkDate.js');

const talkField = (req, res, next) => {
  const { talk } = req.body;
  // const { name, age, talk: { watchedAt, rate } } = req.body;
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (checkDate(talk.watchedAt) !== 3) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = talkField;