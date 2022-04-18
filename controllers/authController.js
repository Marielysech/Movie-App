const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const authModel = require('../models/Users')


async function registerNewUser (req, res) {

}
async function loginUser (req, res) {
    
}

async function logoutUser (req, res) {

}

module.exports = {registerNewUser, loginUser, logoutUser}