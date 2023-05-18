// import { Component } from 'react';
// import css from './Contacts.module.css';

import { ContactsItem } from 'components/ContactsItem/ContactsItem';

const ContactsList = ({ contacts }) => {
  console.log('ContactsList=>', contacts);
  return (
    <ul>
      {contacts.map(({ name, number, id }) => (
        <ContactsItem key={id} name={name} number={number} id={id} />
      ))}
    </ul>
  );
};

export default ContactsList;
