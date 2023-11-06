import React, { useState } from 'react';

const NewMail = ({ onSubmit, onCancel }) => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would usually have logic to send the email...
    onSubmit({ subject, content }); // For example, send this data back to the parent component or server
  };

  return (
    <div>
      <h2>New Mail</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={handleSubjectChange}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <button type="submit">Send Mail</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default NewMail;
