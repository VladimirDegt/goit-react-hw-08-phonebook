import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import {
  StyledSection,
  StyledChangeBtn,
} from './Contacts.styled';
import IconDeleteBin5Fill from 'utils/delete-icon';
import IconWrite from 'utils/change-svg';
import { deleteContact, getContact } from 'redux/contacts/operations';
import {
  selectContactsState,
  selectFilterState,
} from 'redux/contacts/selectors';
import { ModalChange } from 'components/ModalChange/ModalChange';

function Contacts() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector(selectContactsState);
  const { filter } = useSelector(selectFilterState);

  const visibaleContact =
    filter === ''
      ? items
      : items.filter(item =>
          item.name.toLowerCase().includes(filter.toLowerCase())
        );

  useEffect(() => {
    dispatch(getContact());
  }, [dispatch]);

  const onDeleteContact = id => dispatch(deleteContact(id));

  function handleModalOpen() {
    setIsOpenModal(true);
  }

  function modalClose() {
    setIsOpenModal(false);
  }

  const onChangeContact = (id, name, number) => {
    setId(id);
    setName(name);
    setNumber(number);
    handleModalOpen();
  };

  return (
    <StyledSection>
      {isLoading && <p>Loading contacts...</p>}
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Phone</Th>
            </Tr>
          </Thead>
          <Tbody>
            {visibaleContact.map(item => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>{item.number}</Td>
                <Td>
                <StyledChangeBtn
                  type="button"
                  onClick={() => onChangeContact(item.id, item.name, item.number)}
                >
                  <IconWrite />
                </StyledChangeBtn>
              </Td>
              <Td>
                <StyledChangeBtn
                  type="button"
                  onClick={() => onDeleteContact(item.id)}
                >
                  <IconDeleteBin5Fill />
                </StyledChangeBtn>
              </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {isOpenModal && (
        <ModalChange
          modalClose={modalClose}
          id={id}
          name={name}
          number={number}
        />
      )}
    </StyledSection>
  );
}

export default Contacts;
