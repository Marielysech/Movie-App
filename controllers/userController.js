const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const collect = require('collect.js');

// const passport = require('passeport')

const userModel = require('../models/User')
const movieModel = require('../models/Movie');
const User = require('../models/User');
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
// /************************************************************************ */



        // TODO : for all function I have to test with req.user after having implementing the auth
async function getAllMoviesUser (req, res) {
    try {
    let user = req.user.favMovies
    const allTheMovies = await movieModel.find({category : favUserGenres});
    
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
        let userID = req.user._id;
        const favUserMovies = await userModel.find({_id: userID}, {favMovies: 1}).populate('favMovies');
        res.send(favUserMovies);
    } catch (err) {
        console.log(err)
        }
    };

// async function addToFavorites (req, res) {
//     try {
    
//     await userModel.updateOne({name: req.params.name},{$push: { favMovies: movieModel._id}});
//     const favUserMovies = await userModel.findOne({name: req.params.name},{favMovies: 1}).populate('favMovies');
//     res.send(favUserMovies);
//     } catch (err) {
//         console.log(err)
//         }
//     };

async function addToFavorites (req, res) {
    try {
    let userId = req.user._id;
    let movie = await movieModel.findOne({title: req.params.movie})
    await userModel.updateOne({_id: userId}, { $push: { favMovies: movie._id }})

    } catch (err) {
        console.log(err)
        }
    }
    
async function removeFromFavorites (req, res) {
    try {
        let userId = req.user._id;
        let movie = await movieModel.findOne({title: req.params.movie})
        await userModel.updateOne({_id: userId}, { $pull: { favMovies: movie._id }})
    
        } catch (err) {
            console.log(err)
            }
        }
        

module.exports = {getAllMoviesUser, getMoviesByRating, getFavorites, addToFavorites, removeFromFavorites}


// async function accessDB() {
//     let user = await userModel.find({})
//     console.log('THIS IS USERS' + user)    
// }

// accessDB()
// removeFromFavorites()
// accessDB()
