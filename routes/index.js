const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login, logout } = require('../controllers/users');
const { loginValidation, userCreatValidation } = require('../middlewares/validation');
const { infoMessages } = require('../constants/config');

router.post('/signin', loginValidation, login);
router.post('/signup', userCreatValidation, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.get('/signout', logout);
router.use((req, res, next) => {
  next(new NotFoundError(infoMessages.routNotFound));
});

module.exports = router;
