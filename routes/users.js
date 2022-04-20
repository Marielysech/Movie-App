
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const isAllowed = require("../middleware/authorization")


router.get('/', isAllowed, userController.getAllMoviesUser);

router.get('/rating', isAllowed, userController.getMoviesByRating);

router.get('/favorites', isAllowed, userController.getFavorites)

router.route('/favorites/:movie')
  .delete(isAllowed, userController.removeFromFavorites)
  .put(isAllowed, userController.addToFavorites);


module.exports = router;
