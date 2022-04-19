const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/User')





function initialize(passport) {
    const customFields = {
      usernameField: "email",
      passwordField: "password",
    }

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
    });

module.exports = initialize

