const userRouter = require('express').Router();
const { updateProfile, getInfoUser } = require('../controllers/users');
const { userProfileValidation } = require('../middlewares/validation');

userRouter.get('/me', getInfoUser);
userRouter.patch('/me', userProfileValidation, updateProfile);

module.exports = userRouter;
