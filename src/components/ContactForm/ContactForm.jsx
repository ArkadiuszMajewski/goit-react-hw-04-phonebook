import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = evt => {
    if (evt.currentTarget.id === 'name') {
      setName(evt.currentTarget.value);
      // console.log(evt.currentTarget);
    }
    if (evt.currentTarget.id === 'number') {
      setNumber(evt.currentTarget.value);
      // console.log(evt.currentTarget);
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    addContact({ name, number });
    // console.log(onSubmit);
    // console.log(contacts);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const inputId = nanoid();
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor={inputId}>Name</label>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+((['\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces."
          required
          value={name}
          onChange={handleChange}
          id="name"
        />
        <label htmlFor={inputId}>Number</label>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
          id="number"
        />
        <button type="submit">Add contact</button>
      </form>
    </div>
  );
};

export default ContactForm;
