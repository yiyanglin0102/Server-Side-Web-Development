import React, { useState, useEffect } from 'react';
import EventScheduler from './EventScheduler';
import Message from './Message';
import AddPatientForm from './AddPatientForm';
import { fetchPatients } from '../api/patients';
import { fetchMails } from '../api/mails';
import axios from 'axios';

const Dashboard = (props) => {
  const [selectedTab, setSelectedTab] = useState('scheduler');
  const [patients, setPatients] = useState([]);
  const [mails, setMails] = useState([]);
  const [isAddingPatient, setIsAddingPatient] = useState(false);

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
          // console.log(data); // log here
        })
        .catch(err => console.error(err));
    }
    if (selectedTab === 'message') {
      fetchMails()
        .then(data => {
          setMails(data);
          // console.log(data); // log here
        })
        .catch(err => console.error(err));
    }
  }, [selectedTab]);

  const handleSavePatient = ({ firstname, lastname, birthdate }) => {
    console.log(`Saving new patient: ${birthdate} `);

    axios.post('http://localhost:3000/patients', {
      firstname: firstname,
      lastname: lastname,
      birthdate: birthdate,
      host: props.username,
    })
      .then(response => {
        setPatients([...patients, response.data]);
        setIsAddingPatient(false);
      })
      .catch(error => {
        console.error("Error adding patient:", error);
      });
  };

  return (
    <div>
      <div className="banner">
        <h1>Welcome, {props.username}!</h1>
      </div>

      <div className="tabs">
        <button
          className={`tab-button ${selectedTab === 'scheduler' ? 'active' : ''}`}
          onClick={() => handleTabChange('scheduler')}
        >
          Scheduler
        </button>
        <button
          className={`tab-button ${selectedTab === 'patient' ? 'active' : ''}`}
          onClick={() => handleTabChange('patient')}
        >
          Patient
        </button>
        <button
          className={`tab-button ${selectedTab === 'message' ? 'active' : ''}`}
          onClick={() => handleTabChange('message')}
        >
          Message
        </button>
      </div>

      <div className="tab-content">
        {selectedTab === 'scheduler' && <EventScheduler username={props.username} />}
        {selectedTab === 'patient' && (
          <div>
            <h2>Patient Details</h2>
            {!isAddingPatient && (<button onClick={handleAddPatient}>Add New Patient</button>)}
            {!isAddingPatient && (
              <ul>
                {patients.map(patient => (
                  patient.host === props.username ? (
                    <li key={patient._id}>
                      {patient.firstname} {patient.lastname} {new Date(patient.birthdate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </li>
                  ) : null
                ))}
              </ul>
            )}

            {isAddingPatient && <AddPatientForm onClose={handleCloseForm} onSave={handleSavePatient} />}
          </div>
        )}
        {selectedTab === 'message' && <Message username={props.username} mails={mails} />


        }
      </div>
    </div>
  );
}

export default Dashboard;
