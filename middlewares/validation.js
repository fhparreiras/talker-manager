const testEmail = require('../services/emailValidation');
const testPassword = require('../services/passwordValidation');

const validation = (req, res, next) => {
  console.log('Teste middleware');
  const { email, password } = req.body;
  testEmail(email, res);
  testPassword(password, res);
  next();
};

module.exports = validation;
