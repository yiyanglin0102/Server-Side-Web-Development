const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    firstname: { type: String, required: true },
    middleName: String,
    lastname: { type: String, required: true },
    // dob: { type: Date, required: true },
    // sex: { type: String, required: true },
    // ethnicity: String,
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
    // // ... Add other fields as required
});

module.exports = Patient = mongoose.model('Patient', patientSchema);
