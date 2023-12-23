const bcrypt = require('bcrypt');
const User = require('../../../models/users.model');
const { signJwt, verifyJwt } = require('../../../services/jwt');
const {
    authenticationMiddleware,
} = require('../../../middlewares/authMiddleware');

function validateUserCredentials(email, password) {
    if (!email || !password) {
        return res.status(400).json({ error: 'email and password required' });
    }
}

// https://www.youtube.com/watch?v=nukNITdis9g&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp&index=5
function handleErrors(err) {
    let error = { email: '', password: '' };

    // validation errors
    if (err._message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            error[properties.path] = properties.message;
        });
    }
    return error;
}

async function signupUser(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        const token = signJwt(user._id);

        // Store the token in the session
        req.session.token = token;

        return res
            .status(201)
            .json({ message: 'User signup successful', id: user._id });
    } catch (err) {
        const error = handleErrors(err);
        return res.status(400).json({ error });
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    validateUserCredentials(email, password);

    const user = await User.findOne({ email });

    if (!user)
        return res
            .status(400)
            .json({ error: { email: 'Invalid email', password: '' } });

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res
            .status(400)
            .json({ error: { email: 'Invalid Password', password: '' } });
    }

    const token = signJwt(user._id);

    // Store the token in the session
    req.session.token = token;

    return res
        .status(201)
        .json({ message: 'User signup successful', id: user._id });
}

async function logoutUser(req, res) {
    // Clear the token from the session
    req.session = null;

    return res.status(200).redirect('/auth/login');
}

module.exports = {
    signupUser,
    loginUser,
    logoutUser,
};
