const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    firstname: { type: String, required: true },
    middlename: String,
    lastname: { type: String, required: true },
    host: { type: String, required: true },
    birthdate: { type: Date },
    sex: { type: String, required: true },
    ethnicity: { type: String, required: true },
    image_id: { type: String, required: false },
    // race: { type: String, required: false },
    // preferredlanguage: { type: String, required: true },
    // genderidentity: { type: String, required: true },
    // sexualorientation: { type: String, required: true },
    // address: { type: String, required: true },
    // city: { type: String, required: true },
    // state: { type: String, required: true },
    // zipcode: { type: String, required: false },
    // homephone: { type: String, required: true },
    // workphone: { type: String, required: false },
    // cellphone: { type: String, required: false },
    // emailaddress: { type: String, required: false },
    // comments: { type: String, required: false },
    // ssn: { type: String, required: false },
    // maritalstatus: { type: String, required: false },
    // patientportal: { type: String, required: false },
});

module.exports = Patient = mongoose.model('Patient', patientSchema);
