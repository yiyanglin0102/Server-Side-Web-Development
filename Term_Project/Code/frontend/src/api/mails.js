// frontend/api/mails.js

import axios from 'axios';
import { BASE_URL } from './config.js';

export const fetchMails = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/mails`);
    return response.data;
  } catch (error) {
    console.error("Error fetching mails:", error);
    throw error;
  }
};
