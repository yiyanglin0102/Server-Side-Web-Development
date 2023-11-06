import React, { useState, useEffect } from 'react';

const Mailbox = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    // Here we'll use a function to simulate fetching data from a database.
    // In a real app, you'd make an HTTP request to a backend service.
    const fetchEmails = async () => {
      try {
        // Replace this URL with the endpoint for your backend service
        const response = await fetch('/api/emails');
        const data = await response.json();
        setEmails(data); // Set the emails in state
      } catch (error) {
        console.error('Failed to fetch emails', error);
      }
    };

    fetchEmails();
  }, []); // The empty array ensures this effect runs once on mount

  return (
    <div>
      <h2>Inbox</h2>
      <ul>
        {emails.map((email, index) => (
          <li key={index}>
            <div>Subject: {email.subject}</div>
            <div>From: {email.from}</div>
            {/* Display other email data as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Mailbox;
