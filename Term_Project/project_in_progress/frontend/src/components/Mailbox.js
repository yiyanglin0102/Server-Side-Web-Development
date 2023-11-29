import React, { useState } from 'react';
import './styles/Mailbox.css';

const Mailbox = ({ mails, username, onDelete, onRead }) => {
  const [selectedMail, setSelectedMail] = useState(null);

  const handleMailClick = (mail) => {
    if (!mail.isRead) {
      onRead(mail._id);
    }
    setSelectedMail(selectedMail && selectedMail._id === mail._id ? null : mail);
  };

  const handleDelete = (mailId, event) => {
    event.stopPropagation();
    onDelete(mailId);
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
                {!mail.isRead && <div className="unread-indicator"></div>}
                <div className="mail-subject">{mail.title}</div>
                {selectedMail && selectedMail._id === mail._id && (
                  <div className="mail-content">
                    <p>From: {mail.from}</p>
                    <p>Message: {mail.content}</p>
                  </div>
                )}
                <button onClick={(event) => handleDelete(mail._id, event)} className="delete-button">
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