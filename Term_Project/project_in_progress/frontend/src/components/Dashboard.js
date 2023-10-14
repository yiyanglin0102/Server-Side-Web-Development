import React from 'react';
import EventScheduler from './EventScheduler';

const Dashboard = (props) => {
  return <div>
    <EventScheduler username={props.username} />
  </div>;
}

export default Dashboard;
