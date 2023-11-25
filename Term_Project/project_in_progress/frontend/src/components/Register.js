import React, { useState } from 'react';
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import './styles/Register.css';

function Register(props) {
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
        } else if (userData.username.length < 3) {
            setUsernameError("Username must be at least 3 characters");
            isValid = false;
        } else {
            setUsernameError("");
        }

        if (!userData.password) {
            setPasswordError("Password is required");
            isValid = false;
        } else if (userData.password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            isValid = false;
        } else {
            setPasswordError("");
        }

        return isValid;
    };


    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await register(userData);
            setMessage("Registered successfully!");
            navigate('/login');
        } catch (error) {
            setMessage("Error registering. Please try again.");
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleRegister} className="register-form">
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

                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;
