import React, { useState } from 'react';

const AddPatientForm = ({ onClose, onSave }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [sex, setSex] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ firstname, lastname, birthdate, sex, ethnicity, image });
    onClose();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
        <select
          value={sex}
          onChange={(e) => setSex(e.target.value)}
        >
          <option value="">Select Sex</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <select
          value={ethnicity}
          onChange={(e) => setEthnicity(e.target.value)}
        >
          <option value="">Select Ethnicity</option>
          <option value="Asian">Asian</option>
          <option value="Black">Black</option>
          <option value="Hispanic">Hispanic</option>
          <option value="White">White</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <button type="submit">Save</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AddPatientForm;
