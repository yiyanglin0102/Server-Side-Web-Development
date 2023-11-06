import React, { useState } from 'react';
import NewMail from './NewMail';
import Mailbox from './Mailbox';

const Message = ({ onClose, onSave }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [showingMailbox, setShowingMailbox] = useState(true); // true to show the Mailbox initially

  const handleNewMailClick = () => {
    // Function to toggle the view to NewMail component
    setShowingMailbox(false);
  };

  const handleMailboxClick = () => {
    // Function to toggle the view back to Mailbox component
    setShowingMailbox(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ firstname, lastname }); // Send as an object
    onClose();
    setShowingMailbox(true); // Switch back to the Mailbox after saving
  };

  return (
    <div>
      {showingMailbox ? (
        <>
          <Mailbox />
          {/* Button to create new mail */}
          <button onClick={handleNewMailClick}>New Mail</button>
        </>
      ) : (
        <NewMail onSubmit={handleSubmit} onCancel={handleMailboxClick} />
      )}
    </div>
  );
};

export default Message;
