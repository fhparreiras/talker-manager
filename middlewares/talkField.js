const checkDate = require('../services/checkDate.js');

const talkField = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;
  if (!watchedAt) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (checkDate(watchedAt) !== 3) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = talkField;