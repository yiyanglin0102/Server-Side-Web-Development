import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

function Login(props) {
    const [userData, setUserData] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(userData);
            localStorage.setItem('token', response.data.token);
            setMessage("Logged in successfully!");

            props.onLoginSuccess(userData.username); // Notify the parent component of successful login
            navigate('/dashboard'); // Redirect to dashboard upon successful login

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
