const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    firstname: { type: String, required: true },
    middleName: String,
    lastname: { type: String, required: true },
    host: { type: String, required: true },
    birthdate: { type: Date },
    sex: { type: String, required: true },
    ethnicity: { type: String, required: true },
    image_id: { type: String, required: false },
    // race: String,
    // preferredLanguage: String,
    // genderIdentity: String,
    // sexualOrientation: String,
    // address1: String,
    // address2: String,
    // city: String,
    // state: String,
    // zipCode: String,
    // homePhone: String,
    // workPhone: String,
    // cellPhone: String,
    // comments: String,
    // ... Add other fields as required
});

module.exports = Patient = mongoose.model('Patient', patientSchema);
