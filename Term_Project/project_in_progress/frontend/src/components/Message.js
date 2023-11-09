import React, { useState, useEffect } from 'react';
import NewMail from './NewMail';
import Mailbox from './Mailbox';
import axios from 'axios';

const Message = (props) => {
  const [mails, setMails] = useState([]);
  const [showingMailbox, setShowingMailbox] = useState(true); // true to show the Mailbox initially

  // Synchronize the mails state with the props when the component mounts or when props.mails changes
  useEffect(() => {
    setMails(props.mails);
  }, [props.mails]);

  const handleNewMailClick = () => {
    // Function to toggle the view to NewMail component
    setShowingMailbox(false);
  };

  const handleMailboxClick = () => {
    // Function to toggle the view back to Mailbox component
    setShowingMailbox(true);
  };

  const handleDeleteMail = (mailId) => {
    // Call API to delete the mail from the backend
    axios.delete(`http://localhost:3000/mails/${mailId}`)
      .then(response => {
        // If the delete was successful, filter out the deleted mail from the state
        setMails(currentMails => currentMails.filter(mail => mail._id !== mailId));
        // Optionally, you could trigger a new fetch of mails here, if the mails are also being updated elsewhere
      })
      .catch(error => {
        // Handle any errors during the delete request
        console.error('Failed to delete mail:', error);
      });
  };

  return (
    <div>
      {showingMailbox ? (
        <>
          <button onClick={handleNewMailClick}>New Mail</button>
          {/* Pass the local mails state to the Mailbox */}
          <Mailbox mails={mails} username={props.username} onDelete={handleDeleteMail} />
        </>
      ) : (
        <NewMail onCancel={handleMailboxClick} username={props.username} />
      )}
    </div>
  );
};

export default Message;
