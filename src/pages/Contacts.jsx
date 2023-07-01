import AddContactsForm from 'components/AddContactsForm/AddContactsForm';
import Contacts from 'components/Contacts/Contacts';
import Filter from 'components/Filter/Filter';
import { Helmet } from 'react-helmet';

export default function ContactsPage() {
  return (
    <div>
      <Helmet>
        <title>Contacts</title>
      </Helmet>
      <AddContactsForm />
      <Filter />
      <Contacts />
    </div>
  );
};
