const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    name: String,
    data: Buffer,
    contentType: String
  });

module.exports = Image = mongoose.model('Image', imageSchema);
