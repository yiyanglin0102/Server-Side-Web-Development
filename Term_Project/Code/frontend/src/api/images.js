// frontend/api/images.js

import axios from 'axios';
import { BASE_URL } from './config.js';

export const getPatientImage = async (image_id) => {
    try {
        const response = await axios.get(`${BASE_URL}/images/${image_id}`);

        return response.data;
    } catch (error) {
        console.error("Error fetching patients:", error);
        throw error;
    }
}