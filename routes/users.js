
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')


router.get('/users', userController.getAllMoviesUser);

router.get('/users/:filter', userController.getMoviesByFilter);

router.route('/users/favorites/')
  .get(userController.getFavorites)
  .put(userController.addToFavorite);

router.delete('/users/favorites/:movie', userController.removeFromFavorite);


module.exports = router;
