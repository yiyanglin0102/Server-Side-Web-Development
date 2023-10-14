import React, { useState } from 'react';
import EventScheduler from './EventScheduler';

const Dashboard = (props) => {
  const [selectedTab, setSelectedTab] = useState('scheduler');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      {/* Banner */}
      <div className="banner">
        <h1>Welcome, {props.username}!</h1>
        <p>This is your dashboard.</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab-button ${selectedTab === 'scheduler' ? 'active' : ''}`}
          onClick={() => handleTabChange('scheduler')}
        >
          Scheduler
        </button>
        {/* Add more tab buttons as needed */}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {selectedTab === 'scheduler' && <EventScheduler username={props.username} />}
        {/* Add more tab content components as needed */}
      </div>
    </div>
  );
}

export default Dashboard;
