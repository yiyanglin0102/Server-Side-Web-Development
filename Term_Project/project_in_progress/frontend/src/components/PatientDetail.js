import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PatientDetail = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/patients/${id}`);
                setPatient(response.data);
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
        //     event.preventDefault();
        //     try {
        //         await axios.put(`/patients/${id}`, patient);
        //         // Handle success (e.g., show a success message or redirect)
        //     } catch (error) {
        //         console.error("Error updating patient:", error);
        //         // Handle error (e.g., show error message)
        //     }
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
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" name="firstname"
                        value={patient.firstname}
                        onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Last Name:
                    <input type="text" name="firstname"
                        value={patient.lastname}
                        onChange={handleInputChange} />
                </label>
                <br />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default PatientDetail;
