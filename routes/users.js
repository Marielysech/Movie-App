const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController')




router.get('/', moviesController.getAllTheMovies);
router.get('/:genre', moviesController.getMoviesByGenre);
router.get('/:title', moviesController.getMoviesByTitle);



router.get('/auth', moviesController.displayAuthPage);

router.post('/auth/register', moviesController.createNewUser);
router.post('/auth/loggin', moviesController.logginUser);


// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
