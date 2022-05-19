const testEmail = (email) => {
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  if (email === undefined) {
    const errorMessage = { status: 400, message: 'O campo "email" é obrigatório' }; // solução para erro do linter encontrada em https://stackoverflow.com/questions/53080948/generic-throw-giving-expected-an-object-to-be-thrown-lint-error
    throw errorMessage;
  }
  if (!emailRegex.test(email)) {
    const errorMessage = { status: 400, message: 'O "email" deve ter o formato "email@email.com"' };
    throw errorMessage;
  }
  return 'ok';
};

module.exports = testEmail;
