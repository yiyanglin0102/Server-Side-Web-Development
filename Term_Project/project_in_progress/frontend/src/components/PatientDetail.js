import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from './modal';

const formatMongoDateForInput = (mongoDate) => {
    if (!mongoDate) return '';

    // Convert to a JavaScript Date object
    const date = new Date(mongoDate);

    // Extract year, month, and day
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // January is 0
    const day = date.getDate().toString().padStart(2, '0');

    // Format to yyyy-MM-dd
    return `${year}-${month}-${day}`;
};

const PatientDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);


    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/patients/${id}`);
                const fetchedPatient = response.data;

                if (fetchedPatient.birthdate) {
                    fetchedPatient.birthdate = formatMongoDateForInput(fetchedPatient.birthdate);
                }

                setPatient(fetchedPatient);

                if (fetchedPatient.image_id) {
                    try {
                        const imgResponse = await axios.get(`http://localhost:3000/images/${fetchedPatient.image_id}`);
                        setImagePreview(imgResponse.data);
                    } catch (error) {
                        console.error("Error fetching image:", error);
                    }
                }
            } catch (error) {
                console.error("Error fetching patient data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPatient();
    }, [id]);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPatient({ ...patient, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let imageId = patient.image_id; // Assuming 'image_id' is the field in your patient object

        if (selectedFile) {
            const formData = new FormData();
            formData.append('myfile', selectedFile);

            try {
                const response = await fetch('http://localhost:3000/images', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                imageId = data.savedId; // Update the imageId with the new one
            } catch (error) {
                console.error('Error uploading file:', error);
                return; // Exit the function if the image upload fails
            }
        }

        try {
            const updatedPatient = { ...patient, image_id: imageId };
            await axios.put(`http://localhost:3000/patients/${id}`, updatedPatient);
            setSuccessMessage('Patient updated successfully!');
            setShowModal(true); // Show the modal on successful update
        } catch (error) {
            console.error("Error updating patient:", error);
            setSuccessMessage('Failed to update patient.');
            setShowModal(true); // Optionally show the modal even on failure
        }
    };


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

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/dashboard?tab=patient');
    };

    const handleCancelEdit = () => {
        navigate('/dashboard?tab=patient');
    };

    const handleDelete = async () => {
        let imageId = patient.image_id; // Assuming 'image_id' is the field in your patient object


        try {
            await axios.delete(`http://localhost:3000/images/${imageId}`);
        } catch (error) {
            console.error('Error deleting image:', error);
            return; // Exit the function if the image upload fails
        }


        try {
            await axios.delete(`http://localhost:3000/patients/${id}`);
            setSuccessMessage('Patient deleted successfully!');
        } catch (error) {
            console.error("Error updating patient:", error);
            setSuccessMessage('Failed to update patient.');
        }
        setShowModal(true);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!patient) {
        return <div>Patient not found</div>;
    }

    return (
        <div>
            <h1>Edit Patient Information</h1>
            {successMessage && <div className="success-message">{successMessage}</div>}

            <form onSubmit={handleSubmit}>
                {imagePreview && <img src={imagePreview} alt="Patient" style={{ width: '100px', height: 'auto' }} />}
                <br />
                <input type="file" name="myfile" onChange={handleFileChange} />
                <br />
                <label>
                    First Name:
                    <input type="text" name="firstname" value={patient.firstname} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Last Name:
                    <input type="text" name="lastname" value={patient.lastname} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Birthdate:
                    <input type="date" name="birthdate" value={patient.birthdate} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Sex:
                    <select name="sex" value={patient.sex} onChange={handleInputChange}>
                        <option value="">Select Sex</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </label>
                <br />
                <label>
                    Ethnicity:
                    <select name="ethnicity" value={patient.ethnicity} onChange={handleInputChange}>
                        <option value="">Select Ethnicity</option>
                        <option value="Asian">Asian</option>
                        <option value="Black">Black</option>
                        <option value="Hispanic">Hispanic</option>
                        <option value="White">White</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
                <br />

                <button type="submit">Save Changes</button>
                <button type="button" onClick={handleCancelEdit}>Cancel Edit</button>
                <button type="button" onClick={handleDelete}>Delete Patient</button>

                <Modal show={showModal} onClose={handleCloseModal}>
                    <p>{successMessage}</p>
                </Modal>

            </form>
        </div>
    );
};

export default PatientDetail;
