const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/authController')


router.post('/register', moviesController.registerNewUser);
router.get('/register', moviesController.renderRegisterPage);
router.post('/login', moviesController.loginUser);
router.get('/login', moviesController.renderLoginPage);
router.get('/logout', moviesController.logoutUser);

module.exports = router;