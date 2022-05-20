const validateRate = (req, res, next) => {
  const { talk } = req.body;
  if (talk.rate === undefined || talk.rate <= 0 || talk.rate >= 6) {
    const errorMessage = { status: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
    throw errorMessage;
  }
  return next();
};

module.exports = validateRate;