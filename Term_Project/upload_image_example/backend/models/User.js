const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: {
        type: String, // URL or path to the profile picture
    }
});

module.exports = User = mongoose.model('users', UserSchema);