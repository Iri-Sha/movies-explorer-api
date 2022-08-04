const { errorMessages } = require('../constants/config');

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).send({
    message: statusCode === 500 ? errorMessages.serverError : err.message,
  });
  next();
};
