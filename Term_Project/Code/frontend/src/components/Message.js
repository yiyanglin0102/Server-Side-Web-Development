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
    axios.delete(`http://localhost:3000/mails/${mailId}`)
      .then(response => {
        // If the delete was successful, filter out the deleted mail from the state
        setMails(currentMails => currentMails.filter(mail => mail._id !== mailId));
      })
      .catch(error => {
        console.error('Failed to delete mail:', error);
      });
  };

  const handleReadMail = (mailId) => {
    try {
      axios.patch(`http://localhost:3000/mails/${mailId}`, {
        isRead: true
      }).then(response => {
      })
    } catch (error) {
      console.error("Error updating mail read status:", error);
      // Handle errors as needed
    }
  };

  return (
    <div>
      {showingMailbox ? (
        <>
          <button onClick={handleNewMailClick}>New Mail</button>
          <Mailbox mails={mails} username={props.username} onDelete={handleDeleteMail} onRead={handleReadMail} />
        </>
      ) : (
        <NewMail onCancel={handleMailboxClick} username={props.username} />
      )}
    </div>
  );
};

export default Message;
