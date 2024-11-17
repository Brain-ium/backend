const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    },
    dateJoined: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;