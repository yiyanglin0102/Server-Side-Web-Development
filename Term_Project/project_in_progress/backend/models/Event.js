const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: String,
    username: String,
    start: Date,
    end: Date
});

module.exports = Event = mongoose.model('Event', eventSchema);
