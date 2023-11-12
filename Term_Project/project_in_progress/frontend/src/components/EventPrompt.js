import React, { useState, useEffect } from 'react';

const EventPrompt = ({ isOpen, onClose, onSubmit, eventData }) => {
    const [title, setTitle] = useState('');
    const [patient, setPatient] = useState('');
    const [content, setContent] = useState('');

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
                        onChange={e => setPatient(e.target.value)} 
                    />
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
