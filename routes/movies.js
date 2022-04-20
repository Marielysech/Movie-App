const router = require('express').Router();
const moviesController = require('../controllers/moviesController')




router.get('/', moviesController.getAllTheMovies);
router.post('/search', moviesController.redirectToFilter);
router.get('/:filter', moviesController.getMovieByFilter)


module.exports = router;