const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

router.get('/users', checkAuthenticated, authController.renderIndexAuth);
    
  
router.post('/register', checkNotAuthenticated, authController.registerNewUser);
router.get('/register', checkNotAuthenticated, authController.renderRegisterPage);
router.post('/login', checkNotAuthenticated, authController.loginUser);
router.get('/login', checkNotAuthenticated, authController.renderLoginPage);
router.get('/logout', authController.logoutUser);


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {    //a passport function
      return next()
    }
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }




module.exports = router;