const movieRouter = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { movieCreationValidation, movieIdValidation } = require('../middlewares/validation');

movieRouter.get('/', getMovies);
movieRouter.post('/', movieCreationValidation, createMovie);
movieRouter.delete('/:_id', movieIdValidation, deleteMovie);

module.exports = movieRouter;
