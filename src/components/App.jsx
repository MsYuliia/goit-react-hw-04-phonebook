import { useState, useEffect } from 'react';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const handleSubmit = data => {
    for (const contact of contacts) {
      if (contact.name.includes(data.name)) {
        alert(`${data.name} is already in contacts`);
        return;
      }
    }
    setContacts(prevContacts => [data, ...prevContacts]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
    if (contacts.length === 1) {
      localStorage.setItem('contacts', JSON.stringify([]));
    }
  };

  const handleSearch = evt => {
    setFilter(evt.currentTarget.value);
  };

  const getContact = () => {
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
    return filteredContacts;
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onForm={handleSubmit} />
      <h2 className={css.title}>Contacts</h2>
      <Filter onSearch={handleSearch} searchName={filter} />
      <ContactList onDelete={deleteContact} contacts={getContact()} />
    </div>
  );
};
