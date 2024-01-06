const passport = require('passport');
const express = require('express');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const helmet = require('helmet');

function checkLoggedIn(req, res, next) {
    // req.user is available only when the user is logged in
    const isLoggedIn = req.isAuthenticated() && req.user;
    if (!isLoggedIn) {
        return res.status(401).json({
            error: 'User must log in',
        });
    }
    next();
}

// Save the session to the cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Read the session from the cookie
passport.deserializeUser((userId, done) => {
    done(null, userId);
});

const OAuthRouter = express.Router();
OAuthRouter.use(
    cookieSession({
        name: 'googleAuth',
        keys: ['secret-key'],

        // Cookie Options
        maxAge: 24 * 60 * 60 * 1000,
    })
);
OAuthRouter.use(passport.initialize());
OAuthRouter.use(passport.session());

//What the below code does: https://chat.openai.com/share/3be1c318-2c16-42d8-b150-fc17b146c311
OAuthRouter.use((req, res, next) => {
    if (req.session && !req.session.regenerate) {
        req.session.regenerate = (cb) => {
            cb();
        };
    }
    if (req.session && !req.session.save) {
        req.session.save = (cb) => {
            cb();
        };
    }
    next();
});

const AUTH_TOKEN_PARAMS = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `https://localhost:3000/${process.env.REDIRECT_URI}`,
};

function verificationCallback(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}

passport.use(new GoogleStrategy(AUTH_TOKEN_PARAMS, verificationCallback));

// Redirect the user to Google for authentication
OAuthRouter.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// The callback after Google has authenticated the user
OAuthRouter.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        successRedirect: '/',
    })
);

// Logout functionality
OAuthRouter.get('/auth/logout', (req, res) => {
    req.logout();
    return res.redirect('/login');
});

module.exports = OAuthRouter;
