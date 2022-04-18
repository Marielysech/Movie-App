const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const userModel = require('../models/User')
const movieModel = require('../models/Movie')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.use(express.json());

/******************************************************** */
// USED THIS FUCTION TO ADD AN USER

// async function createOneUser (req, res) {
//     try {
//         const newUser = await userModel.create({
//             name: "Viviana",
//             username: "vivitt",
//             email: "viviviyanez@gmail.com",
//             password: "mypassword",
//             favGenres: ["Drama", "Action"],
//             favMovies: ["6258494746686f1c9c6989de", "6258494746686f1c9c6989d6" ]
//         })
        
//         console.log(newUser);
//         } catch (err) {
//             console.log(err)
//             }
// }
// createOneUser();
/************************************************************************ */



async function getAllMoviesUser (req, res) {
    //TODO SHOW MOVIES WITH FAV GENRES FIRST
    //const favUserGenres = await userModel.find({name: req.params.name}, {favGenres: 1});
    try {
        const allTheMovies = await movieModel.find({});
        
        res.send(allTheMovies);
        } catch (err) {
            console.log(err)
            }
        };
    


async function getMoviesByRating (req, res) {
    try {

    const moviesByRating = await movieModel.find().sort({'rating': -1});
  
    res.send(moviesByRating);
    } catch (err) {
        console.log(err)
        }
    };


//TODO RATE MOVIE
// async function rateMovie (req, res) {
//     try {
//         // get a movie and change rating //
    
// } catch (err) {
//     console.log(err)
// }
// };



async function getFavorites (req, res) {
    try {
        const favUserMovies = await userModel.findOne({name: req.params.name},{favMovies: 1}).populate('favMovies');
    
        res.send(favUserMovies);
    } catch (err) {
        console.log(err)
        }
    };

async function addToFavorites (req, res) {
    try {
    
    await userModel.updateOne({name: req.params.name},{$push: { favMovies: movieModel._id}});
    const favUserMovies = await userModel.findOne({name: req.params.name},{favMovies: 1}).populate('favMovies');
    res.send(favUserMovies);
    } catch (err) {
        console.log(err)
        }
    };


async function removeFromFavorites (req, res) {
    try {
    const allTheMoviesUser = await movieModel.find({});
    
    res.send('All the movies ;)');
    } catch (err) {
        console.log(err)
        }
    };


    module.exports = {getAllMoviesUser, getMoviesByRating, getFavorites, addToFavorites, removeFromFavorites}