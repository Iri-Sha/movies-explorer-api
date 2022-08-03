const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const AuthorizationError = require('../errors/AuthorizationError');
const { SECRET_KEY } = require('../constants/config');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getInfoUser = (req, res, next) => {
  User.findById(req.user._id)

    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      } else {
        res.send({ email: user.email, name: user.name });
      }
    })
    .catch((err) => next(err));
};

module.exports.updateProfile = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const { email, name, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, name, password: hash }))
    .then(() => res.send({
      data: { email, name },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else if (err.code === 11000) {
        next(new ConflictError('Указанный email уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorizationError('Неправильные почта или пароль');
      }

      return Promise.all([
        user,
        bcrypt.compare(password, user.password),
      ]);
    })
    .then(([user, isPasswordTrue]) => {
      if (!isPasswordTrue) {
        throw new AuthorizationError('Передан неверный email или пароль');
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          httpOnly: true,
          maxAge: 3600000 * 24 * 7,
          sameSite: 'none',
          secure: true,
        })
        .send({ token });
    })
    .catch((err) => next(err));
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
};
