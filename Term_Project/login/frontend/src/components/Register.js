// frontend/components/Register.js

import React, { useState } from 'react';
import { register } from '../api/auth';

function Register(props) {
    const [userData, setUserData] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await register(userData);
            setMessage("Registered successfully!");
        } catch (error) {
            setMessage("Error registering. Please try again.");
        }
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Username" onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
                <input type="password" placeholder="Password" onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;
