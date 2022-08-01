require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorCatcher = require('./errors/errorCatcher');
const { MONGO_DEFAULT_URL } = require('./constants/config');
const { limiter } = require('./constants/rateLimit');

const { PORT = 3000, NODE_ENV, MONGO_URL } = process.env;

const app = express();

app.use('*', cors({
  origin: [
    'http://localhost:3000',
    'http://shamiren.diplom.nomoredomains.xyz',
    'https://shamiren.diplom.nomoredomains.xyz',
    'http://api.shamiren.diplom.nomoredomains.xyz',
    'https://api.shamiren.diplom.nomoredomains.xyz',
  ],
  credentials: true, // эта опция позволяет устанавливать куки
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : MONGO_DEFAULT_URL, {
  useNewUrlParser: true,
});

app.use(requestLogger); // подключаем логгер запросов
app.use(limiter);
app.use(router);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use(errorCatcher); // централизованный обработчик ошибок

app.listen(PORT);
