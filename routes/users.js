
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')


router.get('/', userController.getAllMoviesUser);

router.get('/rating', userController.getMoviesByRating);

router.get('/favorites', userController.getFavorites)

router.route('/favorites/:movie')
  .delete(userController.removeFromFavorites)
  .put(userController.addToFavorites);




module.exports = router;
