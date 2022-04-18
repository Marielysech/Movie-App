const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController')




router.get('/', moviesController.getAllTheMovies);
router.get('/genre/:genre', moviesController.getMoviesByGenre);
router.get('/title/:title', moviesController.getMoviesByTitle);



module.exports = router;