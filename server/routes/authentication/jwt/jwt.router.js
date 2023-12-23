//This code is same as the other jwt.js file. But this uses cookies
const express = require('express');
const jwtRouter = express.Router();
const { signupUser, loginUser, logoutUser } = require('./jwt.controller');
const {
    authenticationMiddleware,
} = require('../../../middlewares/authMiddleware');
const cookieSession = require('cookie-session');

const COOKIE_SECRET = process.env.COOKIE_SECRET; // Replace with a secure key

// Use cookie-session middleware
jwtRouter.use(
    cookieSession({
        name: 'session',
        keys: [COOKIE_SECRET],
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: 'None',
    })
);

jwtRouter.post('/auth/signup', signupUser);

jwtRouter.post('/auth/login', loginUser);

jwtRouter.get('/auth/logout', authenticationMiddleware, logoutUser);

jwtRouter.get('/restricted', authenticationMiddleware, (req, res) => {
    return res.status(200).render('restricted');
});
module.exports = jwtRouter;
