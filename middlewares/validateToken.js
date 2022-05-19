const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
 
  if (authorization === undefined) {
    const errorMessage = { status: 401, message: 'Token não encontrado' };
    throw errorMessage;
  }
  if (authorization.length < 16) {
    const errorMessage = { status: 401, message: 'Token inválido' };
    throw errorMessage;
  }
  next();
};

module.exports = validateToken;