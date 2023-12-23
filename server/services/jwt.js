const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

function signJwt(userId) {
    const token = jwt.sign(
        {
            userId,
        },
        JWT_SECRET,
        {
            expiresIn: 24 * 60 * 60 * 1000,
        }
    );
    return token;
}

function verifyJwt(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (err) {
        throw new Error({ error: 'Invalid or expired token' });
    }
}

function decodeJwt(token) {
    try {
        const decoded = jwt.decode(token);
        return decoded;
    } catch (err) {
        throw new Error({ error: 'Invalid token' });
    }
}

module.exports = {
    signJwt,
    verifyJwt,
    decodeJwt,
};
