import React, { useEffect, useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // console.log([contacts]);

  const addContact = ({ name, number }) => {
    console.log('name', name);
    console.log('number', number);
    let newContactAdded = contacts.find(
      c => c.name.toLowerCase() === name.toLowerCase()
    );
    if (newContactAdded) {
      alert(`${name} is already in contacts.`);
      return;
    } else {
      const newContact = {
        id: nanoid(),
        name: name,
        number: number,
      };
      setContacts(contacts => [...contacts, newContact]);
    }
  };

  const deleteContact = index => {
    setContacts(contacts => {
      const newListOfContacts = [...contacts];
      console.log(newListOfContacts);
      newListOfContacts.splice(index, 1);
      return newListOfContacts;
    });
  };

  const filterOnChange = evt => {
    setFilter(evt.currentTarget.value.trim());
  };

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const newContacts = filteredContacts();
  console.log(newContacts);
  console.log(filter);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={filterOnChange} />
      {contacts.length !== 0 ? (
        <ContactList contacts={newContacts} deleteContact={deleteContact} />
      ) : (
        <p>No contacts</p>
      )}
    </div>
  );
};

export default App;
