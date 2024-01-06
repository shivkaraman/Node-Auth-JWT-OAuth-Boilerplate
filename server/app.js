const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

//Routers
const jwtRouter = require('./routes/authentication/jwt/jwt.router.js');
const OAuthRouter = require('./routes/authentication/oauth/oauth2.router.js');

const app = express();
app.set('view engine', 'ejs');

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//Get login and signup page (Not required if we already have front end code)
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/auth/signup', (req, res) => {
    res.render('signup');
});
app.get('/auth/login', (req, res) => {
    res.render('login');
});

//Routers
app.use(jwtRouter);
app.use(OAuthRouter);

module.exports = app;
