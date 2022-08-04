const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');
const { SECRET_KEY, errorMessages } = require('../constants/config');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  if (!req.cookies) {
    return new AuthorizationError(errorMessages.authorizationError);
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY);
  } catch (err) {
    next(new AuthorizationError(errorMessages.authorizationError));
  }

  req.user = payload;

  return next();
};
