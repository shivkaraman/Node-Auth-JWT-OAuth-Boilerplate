const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email Required'],
        unique: true,
        validate: [isEmail, 'Enter a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password Required'],
        minLength: [6, 'Password must be atleast 6 characters long'],
    },
});

// Fired when a user is saved to database
UserSchema.post('save', function (doc, next) {
    console.log('User created successfully:', doc.email);
    next();
});

//Fired just before new user is saved to database
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(); //Salt is just a list of random charactes used to pre-append to any string before hashing
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
