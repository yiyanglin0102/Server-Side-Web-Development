// AddPatientForm.js
import React, { useState } from 'react';

const AddPatientForm = ({ onClose, onSave }) => {
  const [patientName, setPatientName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(patientName);
    onClose();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AddPatientForm;
