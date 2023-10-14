// frontend/api/auth.js

import axios from 'axios';

const BASE_URL = "http://localhost:3001";

export const register = userData => {
    return axios.post(`${BASE_URL}/register`, userData);
};

export const login = userData => {
    return axios.post(`${BASE_URL}/login`, userData);
};
