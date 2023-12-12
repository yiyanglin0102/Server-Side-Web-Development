const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    events: [{
        title: String,
        description: String,
        startDate: Date,
        endDate: Date
    }]
});

module.exports = User = mongoose.model('users', UserSchema);
