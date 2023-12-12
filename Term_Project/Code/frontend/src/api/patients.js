// frontend/api/patients.js

import axios from 'axios';
import { BASE_URL } from './config.js';

export const fetchPatients = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/patients`);
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};

export const updatePatient = async (firstname, lastname, birthdate, sex, ethnicity, username, image_id) => {
  try {
    const response = await axios.post(`${BASE_URL}/patients`, {
      firstname,
      lastname,
      birthdate,
      sex,
      ethnicity,
      host: username,
      image_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};