const testEmail = require('../services/emailValidation');
const testPassword = require('../services/passwordValidation');

const validation = (req, res, next) => {
  const { email, password } = req.body;
  testEmail(email);
  testPassword(password);
  next();
};

module.exports = validation;
