import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';
import css from './App.module.css';

export class App extends Component {
  static defaultProps = {
    contacts: [],
    filter: '',
  };

  static propTypes = {
    contacts: PropTypes.array.isRequired,
    filter: PropTypes.string.isRequired,
  };

  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (!contacts) {
      return;
    }
    this.setState({
      contacts: JSON.parse(contacts),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts === prevState.contacts) {
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  handleSumbit = data => {
    for (const contact of this.state.contacts) {
      if (data.name.includes(contact.name)) {
        alert(`${contact.name} "is already in contacts"`);
        return;
      }
    }
    this.setState(({ contacts }) => ({
      contacts: [data, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== contactId),
    });
  };

  handleSearch = evt => {
    this.setState({
      filter: evt.currentTarget.value,
    });
  };

  getContact = () => {
    const { filter, contacts } = this.state;
    const normalizeFilter = filter.toLowerCase();
    const filterContact = contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilter)
    );
    return filterContact;
  };

  render() {
    const { filter } = this.state;
    const contactsForRender = this.getContact();

    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onForm={this.handleSumbit} />

        <h2 className={css.title}>Contacts</h2>
        <Filter onSearch={this.handleSearch} searchName={filter} />
        <ContactList
          onDelete={this.deleteContact}
          contacts={contactsForRender}
        ></ContactList>
      </div>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
};
