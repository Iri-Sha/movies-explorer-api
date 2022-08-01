module.exports.SECRET_KEY = 'some-secret-key';
module.exports.MONGO_DEFAULT_URL = 'mongodb://localhost:27017/bitfilmsdb';

const linkRegExp = /^https?:\/\/(w{3}\.)?[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+)*#*$/;
module.exports = linkRegExp;
