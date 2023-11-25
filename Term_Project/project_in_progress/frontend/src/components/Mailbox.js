import React, { useState } from 'react';
import './styles/Mailbox.css';

const Mailbox = ({ mails, username, onDelete }) => {
  const [selectedMail, setSelectedMail] = useState(null);

  const handleMailClick = (mail) => {
    setSelectedMail(selectedMail && selectedMail._id === mail._id ? null : mail);
  };

  // Handler for delete button
  const handleDelete = (mailId, event) => {
    event.stopPropagation(); // Prevent the mail click handler from firing
    onDelete(mailId); // Call the onDelete function passed down from the parent component
  };

  return (
    <div>
      <h2>Inbox</h2>
      <ul className="mail-list">
        {mails.map((mail) => {
          if (mail.to === username) {
            return (
              <li
                key={mail._id}
                onClick={() => handleMailClick(mail)}
                className={selectedMail && selectedMail._id === mail._id ? 'selected-mail' : ''}
              >
                <div className="mail-subject">{mail.title}</div>
                {selectedMail && selectedMail._id === mail._id && (
                  <div className="mail-content">
                    <div>From: {mail.from}</div>
                    <div>Message: {mail.content}</div>
                  </div>
                )}
                {/* Add a delete button for each mail */}
                <button onClick={(event) => { handleDelete(mail._id, event); console.log(mail._id) }} className="delete-button">
                  Delete
                </button>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default Mailbox;
