const createError = require('http-errors');

// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

/////ROUTES
const moviesRoutes = require('./routes/movies')
const usersRoutes = require('./routes/users')

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const ejs = require('ejs');

const portName = 'localhost';
const port = process.env.PORT || 3000;

dotenv.config();
// //////////  VIEW ENGINE SETUP
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(logger('dev'));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect(process.env.DB_SERVER)
.then(() => console.log("Conected to DB server"))
.catch((err) => console.log(err));

// endpoints
app.use('/movies', moviesRoutes);
app.use('/users', usersRoutes);

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
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server running on port ${port}...`);
})

module.exports = app;
