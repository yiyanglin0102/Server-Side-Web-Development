const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mailSchema = new Schema({
    from: String,
    to: String,
    title: String,
    content: String,
    isRead: Boolean,
});

module.exports = Mail = mongoose.model('Mail', mailSchema);
