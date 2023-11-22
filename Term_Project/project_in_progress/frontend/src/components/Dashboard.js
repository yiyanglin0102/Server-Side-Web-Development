import React, { useState, useEffect } from 'react';
import EventScheduler from './EventScheduler';
import Message from './Message';
import AddPatientForm from './AddPatientForm';
import { fetchPatients } from '../api/patients';
import { fetchMails } from '../api/mails';
import axios from 'axios';
import './Dashboard.css'; // Import the stylesheet for styling

const Dashboard = (props) => {
  const [selectedTab, setSelectedTab] = useState('scheduler');
  const [patients, setPatients] = useState([]);
  const [mails, setMails] = useState([]);
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupImage, setPopupImage] = useState('');
  const [popupBirthdate, setBirthdate] = useState('');
  const [popupEthnicity, setEthnicity] = useState('');
  const [popupSex, setSex] = useState('');


  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleAddPatient = () => {
    setIsAddingPatient(true);
  };

  const handleCloseForm = () => {
    setIsAddingPatient(false);
  };

  useEffect(() => {
    if (selectedTab === 'patient') {
      fetchPatients()
        .then(data => {
          setPatients(data);
        })
        .catch(err => console.error(err));
    }
    if (selectedTab === 'message') {
      fetchMails()
        .then(data => {
          setMails(data);
        })
        .catch(err => console.error(err));
    }
  }, [selectedTab]);

  const handleSavePatient = async ({ firstname, lastname, birthdate, sex, ethnicity, image_id }) => {
    try {
      const patientResponse = await axios.post('http://localhost:3000/patients', {
        firstname,
        lastname,
        birthdate,
        sex,
        ethnicity,
        host: props.username,
        image_id,
      });

      setPatients([...patients, patientResponse.data]);
      setIsAddingPatient(false);
    } catch (error) {
      console.error("Error in processing:", error);
    }
  };

  const handleHover = (patient) => {
    fetch(`http://localhost:3000/patients/${patient.image_id}`)
      .then(response => response.text())
      .then(data => {
        setPopupImage(data);
        setShowPopup(true);
        setBirthdate(patient.birthdate);
        setEthnicity(patient.ethnicity);
        setSex(patient.sex);
      })
      .catch(err => console.error(err));
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <div className="banner">
        <h1>Welcome, {props.username}!</h1>
        <p>{getCurrentDateTime()}</p>
      </div>

      <div className="tabs">
        <button className={`tab-button ${selectedTab === 'scheduler' ? 'active' : ''}`} onClick={() => handleTabChange('scheduler')}>Scheduler</button>
        <button className={`tab-button ${selectedTab === 'patient' ? 'active' : ''}`} onClick={() => handleTabChange('patient')}>Patient</button>
        <button className={`tab-button ${selectedTab === 'message' ? 'active' : ''}`} onClick={() => handleTabChange('message')}>Message</button>
      </div>

      <div className="tab-content">
        {selectedTab === 'scheduler' && <EventScheduler username={props.username} />}
        {selectedTab === 'patient' && (
          <div>
            <h2>Patient Details</h2>
            {!isAddingPatient && <button onClick={handleAddPatient}>Add New Patient</button>}
            {!isAddingPatient && (
              <ul>
                {patients.map(patient => (
                  patient.host === props.username ? (
                    <li key={patient._id} onMouseEnter={() => handleHover(patient)} onMouseLeave={handleMouseLeave}>
                      {patient.firstname} {patient.lastname}
                      <br />
                      {/* Sex: {patient.sex ? patient.sex : "Not specified"} */}
                      {/* Ethnicity: {patient.ethnicity ? patient.ethnicity : "Not specified"} */}
                    </li>
                  ) : null
                ))}
              </ul>
            )}
            {showPopup && (
              <div className="popup">
                <img src={popupImage} alt="Patient" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                <br />
                Birthdate : {new Date(popupBirthdate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                <br />
                Ethnicity :  {popupEthnicity} <br />
                Sex : {popupSex}
              </div>
            )}
            {isAddingPatient && <AddPatientForm onClose={handleCloseForm} onSave={handleSavePatient} />}
          </div>
        )}
        {selectedTab === 'message' && <Message username={props.username} mails={mails} />}
      </div>
    </div>
  );
};

export default Dashboard;
