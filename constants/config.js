const SECRET_KEY = 'some-secret-key';
const MONGO_DEFAULT_URL = 'mongodb://localhost:27017/moviesdb';

const errorMessages = {
  emailError: 'Указанный email уже зарегистрирован',
  authorizationError: 'Необходима авторизация',
  urlError: 'Некорректный формат ссылки',
  userNotFoundError: 'Запрашиваемый пользователь не найден',
  loginError: 'Неправильные почта или пароль',
  dataError: 'Переданы некорректные данные',
  movieNotFoundError: 'Видео не найдено',
  movieDeleteError: 'Вы не можете удалить это видео',
  serverError: 'На сервере произошла ошибка',
};

const infoMessages = {
  logoutMessage: 'Выход',
  movieDeleted: 'Видео удалено',
  routNotFound: 'Страницы не существует',
};

module.exports = {
  SECRET_KEY, MONGO_DEFAULT_URL, errorMessages, infoMessages,
};
