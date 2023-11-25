import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import './styles/Login.css';

function Login(props) {
    const [userData, setUserData] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;

        if (!userData.username) {
            setUsernameError("Username is required");
            isValid = false;
        } else {
            setUsernameError("");
        }

        if (!userData.password) {
            setPasswordError("Password is required");
            isValid = false;
        } else {
            // setPasswordError("Incorrect username or password.");
        }

        return isValid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await login(userData);
            localStorage.setItem('token', response.data.token);
            setMessage("Logged in successfully!");
            props.onLoginSuccess(userData.username);
            navigate('/dashboard');
        } catch (error) {
            if (error.response && error.response.data) {
                // You can further refine this check based on your API response structure
                setMessage("Incorrect username or password.");
            } else {
                setMessage("Error logging in. Please try again.");
            }
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                />
                {usernameError && <p className="error-message">{usernameError}</p>}

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                />
                {passwordError && <p className="error-message">{passwordError}</p>}

                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;
