// frontend/components/Login.js

import React, { useState } from 'react';
import { login } from '../api/auth';

function Login(props) {
    const [userData, setUserData] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(userData);
            localStorage.setItem('token', response.data.token);
            setMessage("Logged in successfully!");
            // Navigate to another page if needed
        } catch (error) {
            setMessage("Error logging in. Please try again.");
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
                <input type="password" placeholder="Password" onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;
