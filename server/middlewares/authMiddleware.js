const { verifyJwt } = require('../services/jwt');

function authenticationMiddleware(req, res, next) {
    // Check if the user is authenticated by checking the session
    if (!req.session || !req.session.token) {
        return res.status(401).redirect('/auth/login');
    }

    const { token } = req.session;

    try {
        verifyJwt(token);
        next();
    } catch (err) {
        res.status(400).redirect('/auth/login');
    }
}

module.exports = {
    authenticationMiddleware,
};
