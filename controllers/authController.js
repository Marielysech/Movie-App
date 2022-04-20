const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userModel = require('../models/User')
const bcrypt = require('bcrypt')
const initialize = require('../config/passport-config')
const passport = require('passport')


initialize(passport);


async function registerNewUser (req, res) { 
    try {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    const user = await userModel.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword        
    })

    // in the case where we have checkbox to select fav genre when registering
    // const favGenre = [req.body.genre1, req.body.genre2, req.body.genre3, req.body.genre4]
    // for (let i=0; i<genre.length; i++) {
    //     if(genre[i]) user.favGenres.push(genre[i])
    // }

    } catch (err) {
        console.log(err.message)
    }
}

async function loginUser (req, res) {
    passport.authenticate('local',{
        successRedirect: '/users',
        failureRedirect: '/login'
    }) (req, res);
}

const renderLoginPage = async (req,res) => {
    return res.render('login.ejs')
}

const renderRegisterPage = async (req,res) => {
    return res.render('register.ejs')
}


// TODO
async function logoutUser (req, res) {
    req.logOut()        //also passport function
    res.clearCookie("connect.sid", { path: "/" });

    req.session.destroy(function (err) {
        if (err) {
        return next(err);
        }
        res.redirect('/users/login')
    });
    
    
}

module.exports = {registerNewUser, loginUser, logoutUser, renderLoginPage,renderRegisterPage}