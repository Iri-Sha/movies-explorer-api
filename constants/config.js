const SECRET_KEY = 'some-secret-key';
const MONGO_DEFAULT_URL = 'mongodb://localhost:27017/bitfilmsdb';

const linkRegExp = /^https?:\/\/(w{3}\.)?[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+)*#*$/;
module.exports = { linkRegExp, SECRET_KEY, MONGO_DEFAULT_URL };
