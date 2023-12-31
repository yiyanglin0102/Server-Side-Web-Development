import React, { useState, useEffect } from 'react';
import EventScheduler from './EventScheduler';
import Message from './Message';
import AddPatientForm from './AddPatientForm';
import { fetchPatients, updatePatient } from '../api/patients';
import { fetchMails } from '../api/mails';
import { getPatientImage } from '../api/images';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles/Dashboard.css';

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
  const [popupFirstname, setFirstname] = useState('');
  const [popupLastname, setLastname] = useState('');
  const navigate = useNavigate();


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

  const location = useLocation();

  useEffect(() => {
    // Check URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get('tab');
    if (tab) {
      setSelectedTab(tab);
    }
  }, [location]);

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
      const updatePatientResponse = updatePatient(firstname,
        lastname,
        birthdate,
        sex,
        ethnicity, props.username, image_id);

      setPatients([...patients, updatePatientResponse]);
      setIsAddingPatient(false);
    } catch (error) {
      console.error("Error in processing:", error);
    }
  };

  const handleHover = async (patient) => {
    try {
      getPatientImage(patient.image_id)
        .then(patientImage => {
          setPopupImage(patientImage);
        })
      setShowPopup(true);
      setFirstname(patient.firstname);
      setLastname(patient.lastname);
      setBirthdate(patient.birthdate);
      setEthnicity(patient.ethnicity);
      setSex(patient.sex);
    } catch (error) {
      console.error("Error in get image:", error);
    }

  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  const handleEditPatientClick = (patientId) => {
    navigate(`/patient/${patientId}`);
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
            {!isAddingPatient && <button className="add-patient-button" onClick={handleAddPatient}>
              Add New Patient</button>}
            {!isAddingPatient && (
              <ul className="patient-list">
                {patients
                  .sort((a, b) => {
                    // Compare by first name, then by last name if first names are the same
                    let nameA = (a.firstname || '').toLowerCase() + (a.lastname || '').toLowerCase();
                    let nameB = (b.firstname || '').toLowerCase() + (b.lastname || '').toLowerCase();

                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                  })
                  .map(patient => (
                    patient.host === props.username ? (
                      <li key={patient._id}>
                        <button onClick={() => handleEditPatientClick(patient._id)}
                          onMouseEnter={() => handleHover(patient)} onMouseLeave={handleMouseLeave}>
                          {patient.firstname} {patient.lastname}
                          <br />
                        </button>
                      </li>
                    ) : null
                  ))
                }
              </ul>
            )}
            {showPopup && (
              <div className="popup">
                <img src={popupImage} alt="Patient" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                <br />
                First Name : {popupFirstname} <br />
                Last Name : {popupLastname} <br />
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
    </div >
  );
};

export default Dashboard;
