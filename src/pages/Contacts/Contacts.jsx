import { Helmet } from 'react-helmet';
import Contacts from 'components/Contacts/Contacts';
import Filter from 'components/Filter/Filter';
import { NewContactBtn } from 'components/NewContactBtn/NewContactBtn';
import { StyledSection } from './Contacts.styled';

export default function ContactsPage() {
  return (
    <StyledSection>
      <Helmet>
        <title>Contacts</title>
      </Helmet>
      <NewContactBtn/>
      <Filter />
      <Contacts />
    </StyledSection>
  );
};
