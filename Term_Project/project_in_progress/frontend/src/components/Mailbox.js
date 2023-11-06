import React, { useState } from 'react';

const Mailbox = ({ onClose, onSave }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ firstname, lastname }); // Send as an object
    onClose();
  };

  return (
    <div>
     <p>123</p>
    </div>
  );
};

export default Mailbox;
