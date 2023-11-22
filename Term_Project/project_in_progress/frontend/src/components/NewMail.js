import React, { useState } from 'react';
import axios from 'axios';
import './styles/NewMail.css'; // Make sure the path to your CSS file is correct

const NewMail = (props) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [mails, setMails] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would usually have logic to send the email...
    // onSubmit({ subject, content }); // For example, send this data back to the parent component or server

    console.log(`Saving new mail: To: ${to}, ${subject} , ${content}`);
    axios.post('http://localhost:3000/mails', {
      from: props.username,
      to: to,
      title: subject,
      content: content
    })
      .then(response => {
        setMails([...mails, response.data]);
        props.onCancel();
      })
      .catch(error => {
        console.error("Error adding patient:", error);
      });
  };

  return (
    <div className="new-mail-container">
      <h2>New Mail</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="to">To:</label>
          <input
            type="text"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button type="submit">Send Mail</button>
        <button type="button" onClick={props.onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default NewMail;
