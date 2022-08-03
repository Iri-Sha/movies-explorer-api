const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');
const { SECRET_KEY } = require('../constants/config');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  if (!req.cookies) {
    return new AuthorizationError('Необходима авторизация');
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY);
  } catch (err) {
    next(new AuthorizationError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
