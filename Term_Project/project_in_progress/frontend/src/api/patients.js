// frontend/api/patients.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // adjust this to match your API's base URL

export const fetchPatients = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/patients`);
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};
