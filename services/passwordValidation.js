const testPassword = (password) => {
  if (!password) {
    const errorMessage = { status: 400, message: 'O campo "password" é obrigatório' };
    throw errorMessage;
  }
  if (password.length < 6) {
    const errorMessage = { status: 400, message: 'O "password" deve ter pelo menos 6 caracteres' };
    throw errorMessage;
  }
  return 'ok';
};

module.exports = testPassword;