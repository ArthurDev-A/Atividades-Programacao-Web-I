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

app.use((req, res, next) => {
  console.log(`Accessed: ${req.originalUrl} at ${new Date().toISOString()}`);
  next();
});

router.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

router.get('/index/about', (req, res, next) => {
  res.send("<title> About </title><h1>About</h1>")
  console.log("About")
})

router.get('/index/users/signup', (req, res, next) => {
  res.send("<title>Signup</title><h1>Signup</h1>")
  console.log("Signup")
})

router.get('/index/users/signin', (req, res, next) => {
  res.send("<title>Signin</title><h1>Signin</h1>")
  console.log("Signin")
})

router.get('/index/users', (req, res, next) => {
  res.send("<title>Users</title><h1>Users</h1>")
  console.log("Users")
})

router.get('/index/contact', (req, res, next) => {
  res.send("<title>Contact</title><h1>Contact</h1>")
  console.log("Contact")
})

router.get('/index/portifolio', (req, res, next) => {
  res.send("<title>Portifolio</title><h1>Portifolio</h1>")
  console.log("Portifolio")
})

router.get('/index', (req, res, next) => {
  res.send("<title>Index</title><h1>Index</h1>")
  console.log("Index")
})

router.get('/users/:userid', (req, res) => {
  const userId = req.params.userId
  if (userId) {
    res.send(`<h1>Bem vindo, Usuário ${userId}!</h1>`)
    console.log(`Úser ${userId} signed in.`)
  } else {
    res.redirect('/index/users/signup')
  }
})

app.use('/', router)

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.send('<h1>Page Not Found</h1><a href="/index">De volta para a tela inicial</a>')
})

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

module.exports = app;
