const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', {title: "Tela antes do login"});
});

app.get('/login', (req, res) => {
    res.render('index', {title: "Tela de login"});
});

app.get('/register', (req, res) => {
    res.render('index', {title: "Tela de registro"});
});

app.get('/principal', (req, res) => {
    res.render('index', {title: "Tela principal"});
});

module.exports = app;