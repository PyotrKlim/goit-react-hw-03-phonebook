import { Component } from 'react';
import FormLogin from './FornLogin/FormLogin';
import ContactsList from './Contacts/Contacts';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = newContact => {
    console.log(newContact);

    // this.setState(prevState => ({
    //   contacts: [data, ...prevState.contacts],
    // }));

    const { name, number } = newContact;
    console.log(name, number);

    this.setState();
    // const todolist = {
    //   name: name,
    //   number: number,
    //   id: id,
    // };
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
  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <>
        <FormLogin onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <input
          type="text"
          onChange={this.onFilterChange}
          value={this.state.filter}
        />
        <ContactsList contacts={filteredContacts} />
      </>
    );
  }
}

// export default FormLogin;
