const validatePersonalData = (req, res, next) => {
  const { name, age } = req.body;
  const errorMessage = { status: 400, message: 'O campo "name" é obrigatório' };
  if (!name) {
    throw errorMessage;
  }
  if (name.length < 3) {
    errorMessage.message = 'O "name" deve ter pelo menos 3 caracteres';
    throw errorMessage;
  }
  if (!age) {
    errorMessage.message = 'O campo "age" é obrigatório';
    throw errorMessage;
  }
  if (parseInt(age, 10) < 18) {
    errorMessage.message = 'A pessoa palestrante deve ser maior de idade';
    throw errorMessage;
  }
  next();
};

module.exports = validatePersonalData;