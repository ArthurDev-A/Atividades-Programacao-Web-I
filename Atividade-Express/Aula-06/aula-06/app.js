var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const port = 3000;
const router = express.Router();

router.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

router.get('/index/about', (req, res, next) => {
  res.send("About")
  console.log("About")
})

router.get('/index/users/signup', (req, res, next) => {
  res.send("signup")
  console.log("signup")
})

router.get('/index/users/signin', (req, res, next) => {
  res.send("signin")
  console.log("signin")
})

router.get('/index/users', (req, res, next) => {
  res.send("users")
  console.log("users")
})

router.get('/index/contact', (req, res, next) => {
  res.send("contact")
  console.log("contact")
})

router.get('/index/portifolio', (req, res, next) => {
  res.send("portifolio")
  console.log("portifolio")
})

router.get('/index', (req, res, next) => {
  res.send("Index")
  console.log("Index")
})


app.use('/', router)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;
