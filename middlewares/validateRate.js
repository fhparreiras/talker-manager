const validateRate = (req, res, next) => {
  const { talk } = req.body;
  if (talk.rate > 0 && talk.rate < 6) {
    next();
  }
  return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
};

module.exports = validateRate;