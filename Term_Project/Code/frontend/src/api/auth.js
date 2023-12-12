// frontend/api/auth.js

import axios from 'axios';
import { BASE_URL } from './config.js';

export const register = userData => {
    return axios.post(`${BASE_URL}/register`, userData);
};

export const login = userData => {
    return axios.post(`${BASE_URL}/login`, userData);
};
