const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const movieModel = require('../models/Movie')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.use(express.json());

////////////////////////////////////////////////////////



async function getAllTheMovies (req, res) {
    try {
    const allTheMovies = await movieModel.find({});
    
    res.send(allTheMovies);
    } catch (err) {
        console.log(err)
        }
    };



async function getMoviesByGenre (req, res) {
    try {
    const moviesByGenre = await movieModel.find({category: req.params.genre});
    
    res.send(moviesByGenre);
    } catch (err) {
        console.log(err)
        }
    };


async function getMoviesByTitle (req, res) {
    try {
    const moviesByTitle = await movieModel.find({title: {$regex: `${req.params.title}` }});
    
    res.send(moviesByTitle);
    } catch (err) {
        console.log(err)
        }
    };


module.exports = {getAllTheMovies, getMoviesByGenre, getMoviesByTitle, registerNewUser, loginUser, logoutUser}