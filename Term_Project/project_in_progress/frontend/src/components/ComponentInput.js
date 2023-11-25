import React, { useState } from 'react';
import axios from 'axios';
import './PatientNameInput.css'; // Your CSS file for styling

const PatientNameInput = () => {
    const [patientName, setPatientName] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleNameChange = async (event) => {
        // ... handleNameChange implementation ...
    };

    return (
        <div>
            <input
                type="text"
                value={patientName}
                onChange={handleNameChange}
                placeholder="Enter patient's name"
            />
            {suggestions.length > 0 && (
                <ul className="suggestions">
                    {/* Render suggestions */}
                </ul>
            )}
        </div>
    );
};

export default PatientNameInput;
