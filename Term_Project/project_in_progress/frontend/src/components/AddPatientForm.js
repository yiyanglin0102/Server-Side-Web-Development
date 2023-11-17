import React, { useState } from 'react';

const AddPatientForm = ({ onClose, onSave }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [sex, setSex] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('myfile', selectedFile);

    fetch('http://localhost:3000/uploads', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        // Now call onSave here, after the state has been updated
        onSave({
          firstname,
          lastname,
          birthdate,
          sex,
          ethnicity,
          image_id: data.savedId // Pass the image_id directly from the response
        });

        // Close the form
        onClose();
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
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
        <br></br><br></br><br></br>
        <br></br>
        <input type="file" name="myfile" onChange={handleFileChange} />
        {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100px', height: 'auto' }} />}
        <br></br><br></br><br></br>
        <button type="submit">Save</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AddPatientForm;
