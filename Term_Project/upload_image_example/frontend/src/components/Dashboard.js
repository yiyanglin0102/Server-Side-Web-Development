import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileUploadForm from './FileUploadForm';

function Dashboard({ username }) {
  const [user, setUser] = useState(null);


  return (
    <div>
      <h1>{username}'s Profile</h1>

      <FileUploadForm />
    </div>
  );
}

export default Dashboard;
