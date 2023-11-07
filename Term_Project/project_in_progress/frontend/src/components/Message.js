import React, { useState } from 'react';
import NewMail from './NewMail';
import Mailbox from './Mailbox';
import axios from 'axios';

const Message = (props) => {

  const [showingMailbox, setShowingMailbox] = useState(true); // true to show the Mailbox initially

  const handleNewMailClick = () => {
    // Function to toggle the view to NewMail component
    setShowingMailbox(false);
  };

  const handleMailboxClick = () => {
    // Function to toggle the view back to Mailbox component
    setShowingMailbox(true);
  };


  const handleDeleteMail = (mailId, setMails) => {
    console.log('Mail id:', mailId);
    // Call API to delete the mail from the backend
    // axios.delete(`/api/mails/${mailId}`)
    //   .then(response => {
    //     // If the delete was successful, filter out the deleted mail from the state
    //     setMails(mails => mails.filter(mail => mail._id !== mailId));
    //     console.log('Mail deleted:', response.data.message);
    //   })
    //   .catch(error => {
    //     // Handle any errors during the delete request
    //     console.error('Failed to delete mail:', error);
    //   });
  };

  return (
    <div>
      {showingMailbox ? (
        <>
          <button onClick={handleNewMailClick}>New Mail</button>
          <Mailbox mails={props.mails} username={props.username} onDelete={handleDeleteMail} />
        </>
      ) : (
        <NewMail onCancel={handleMailboxClick} username={props.username} />
      )}
    </div>
  );
};

export default Message;
