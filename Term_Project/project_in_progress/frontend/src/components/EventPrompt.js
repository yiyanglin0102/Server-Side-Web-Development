import React, { useState, useEffect } from 'react';

const EventPrompt = ({ isOpen, onClose, onSubmit, eventData }) => {
    const [title, setTitle] = useState('');
    const [patient, setPatient] = useState('');
    const [content, setContent] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handlePatientChange = async (e) => {
        const input = e.target.value;
        setPatient(input);

        if (input.length > 1) {
            try {
                const response = await fetch(`http://localhost:3000/patients/search?name=${input}`);
                const data = await response.json();
                setSuggestions(data.map(patient => `${patient.firstname} ${patient.lastname}`));
            } catch (error) {
                console.error("Error fetching patient names:", error);
            }
        } else {
            setSuggestions([]);
        }
    };


    useEffect(() => {
        // Populate the form with eventData when the prompt is opened for editing
        if (eventData) {
            setTitle(eventData.title || '');
            setPatient(eventData.patient || '');
            setContent(eventData.content || '');
        } else {
            // Reset the form when creating a new event
            setTitle('');
            setPatient('');
            setContent('');
        }
    }, [eventData]);

    const handleSubmit = () => {
        // console.log(eventData);
        onSubmit({ title, patient, content });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="prompt-overlay">
            <div className="prompt-container">
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    Patient:
                    <input
                        type="text"
                        value={patient}
                        onChange={handlePatientChange}
                    />
                    <div className="suggestions-container">
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className="suggestion"
                                onClick={() => {
                                    setPatient(suggestion);
                                    setSuggestions([]);
                                }}
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                </label>

                <label>
                    Content:
                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </label>
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={onClose}>Cancel</button>
            </div>

        </div>
    );
};

export default EventPrompt;
