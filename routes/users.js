
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')


router.get('/:name', userController.getAllMoviesUser);

router.get('/:name/rating', userController.getMoviesByRating);

router.route('/:name/favorites')
  .get(userController.getFavorites)
  .put(userController.addToFavorites);

router.delete('/users/favorites/:movie', userController.removeFromFavorites);





module.exports = router;
