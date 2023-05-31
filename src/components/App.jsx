import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './Contacts/Contacts';
import { nanoid } from 'nanoid';
import FilterContacts from './FilterContacts/FilterContacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    localStorage.getItem('contacts') &&
      this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
  }

  componentDidUpdate(_, prevstate) {
    if (prevstate.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = newContact => {
    const isInContacts = this.state.contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isInContacts) {
      alert(newContact.name + 'is already in contacts');
      return;
    }

    this.setState(prevState => ({
      contacts: [{ ...newContact, id: nanoid() }, ...prevState.contacts],
      filter: '',
    }));
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  onFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <>
        <ContactForm onSubmit={this.formSubmitHandler} />

        <FilterContacts onChange={this.onFilterChange} value={filter} />
        {contacts.length > 0 && (
          <ContactsList
            contacts={filteredContacts}
            deleteContact={this.deleteContact}
          />
        )}
      </>
    );
  }
}
