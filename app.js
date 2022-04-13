const createError = require('http-errors');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/////ROUTES
//const moviesRoutes = require('./routes/moviesRouter')
//const usersRoutes = require('./routes/usersRouter')

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
//// MONGO DB SERVER
const DB_SERVER = "mongodb://localhost:27017"
const database = "simpleUserDB"
// mongoose.connect(`${DB_SERVER}/${database}`)
//   .then(() => console.log("Conected to DB server"))
//   .catch((err) => console.log(err));

  mongoose.connect(process.env.DB_SERVER)
  .then(() => console.log("Conected to DB server"))
  .catch((err) => console.log(err));




const app = express();

// //////////  VIEW ENGINE SETUP
const ejs = require('ejs');
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));



//app.use('/movies', moviesRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




//////////////////
const portName = 'localhost';
const port = process.env.PORT || 3000;
//////////////////
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server running on port ${port}...`);
})

module.exports = app;
