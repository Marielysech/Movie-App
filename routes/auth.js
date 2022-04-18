const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/authController')


router.post('/register', moviesController.registerNewUser);
router.post('/login', moviesController.loginUser);
router.get('/logout', moviesController.logoutUser);

module.exports = router;