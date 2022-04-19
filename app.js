const createError = require('http-errors');

// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

/////ROUTES
const moviesRoutes = require('./routes/movies')
const usersRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')


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
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


//passport
const passport = require('passport')
const session = require('express-session')
app.use(passport.initialize())
app.use(passport.session())

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 } //1hour
}))

//app.use(logger('dev'));
//app.use(cookieParser());


mongoose.connect(process.env.DB_SERVER)
.then(() => console.log("Conected to DB server"))
.catch((err) => console.log(err));

// routes
app.use('/movies', moviesRoutes);
app.use('/users', usersRoutes);
app.use('/auth', authRoutes)

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
