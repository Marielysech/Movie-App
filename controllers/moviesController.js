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
    
    res.json(allTheMovies);
    } catch (err) {
        console.log(err)
        }
    };

async function getMovieByFilter (req,res) {
    try {
       const filter = req.params.filter
       if (isNaN(filter)) {
            const filterCapital = firstLetterUpperCase(filter)
            let result = await movieModel.find({category: filterCapital}) 
            console.log(result)
                if (result.length > 0) {
                    return res.send(result);
                } const filteredMovie = await movieModel.find({title: {$regex: filterCapital }});
                  return res.send(filteredMovie);
        } else if (filter < 11) {
            const filteredMovie = await movieModel.find({rating: {$gte: filter}});
            return res.send(filteredMovie);
        } const filteredMovie = await movieModel.find({year: filter})
          return res.send(filteredMovie);
    } catch (err) {
        console.log(err)
    }
};

module.exports = {getAllTheMovies, getMovieByFilter}


function firstLetterUpperCase(str) {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 }