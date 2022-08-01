const rateLimit = require('express-rate-limit');

module.exports.SECRET_KEY = 'some-secret-key';
module.exports.linkRegExp = /^https?:\/\/(w{3}\.)?[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+)*#*$/;
module.exports.MONGO_DEFAULT_URL = 'mongodb://localhost:27017/bitfilmsdb';

module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});
