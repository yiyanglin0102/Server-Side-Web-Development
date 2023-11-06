// frontend/api/mails.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // adjust this to match your API's base URL

export const fetchMails = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/mails`);
    return response.data;
  } catch (error) {
    console.error("Error fetching mails:", error);
    throw error;
  }
};
