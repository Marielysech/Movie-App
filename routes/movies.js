const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController')




router.get('/', moviesController.getAllTheMovies);
router.get('/genre/:genre', moviesController.getMoviesByGenre);
router.get('/title/:title', moviesController.getMoviesByTitle);


router.post('/auth/register', moviesController.registerNewUser);
router.post('/auth/login', moviesController.loginUser);
router.get('/auth/logout', moviesController.logoutUser);


module.exports = router;