import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyledSection,
  StyledContainerTable,
  StyledFirstRowHead,
  StyledSecondRowHead,
  StyledFirstRow,
  StyledSecondRow,
  StyledChangeBtn,
} from './Contacts.styled';
import IconDeleteBin5Fill from 'utils/delete-icon';
import IconWrite from 'utils/change-svg';
import { deleteContact, getContact } from 'redux/contacts/operations';
import { selectContactsState, selectFilterState } from 'redux/contacts/selectors';
import { ModalChange } from 'components/ModalChange/ModalChange';

function Contacts() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const { items, isLoading  } = useSelector(selectContactsState);
  const { filter } = useSelector(selectFilterState);

  const visibaleContact = filter === ''
  ? items
  : items.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  )

  useEffect(() => {
    dispatch(getContact());
  }, [dispatch]);

  const onDeleteContact = id => dispatch(deleteContact(id));

  function handleModalOpen(){
    setIsOpenModal(true)
  };

  function modalClose(){
    setIsOpenModal(false)
  };

  const onChangeContact = (id, name, number) => {
    setId(id);
    setName(name);
    setNumber(number);
    handleModalOpen();
  }

  return (
    <StyledSection>
      {isLoading && <p>Loading contacts...</p>}
      <StyledContainerTable>
        <thead>
          <tr>
            <StyledFirstRowHead>Name</StyledFirstRowHead>
            <StyledSecondRowHead>Phone</StyledSecondRowHead>
          </tr>
        </thead>
        <tbody>
          {visibaleContact.map(item => (
            <tr key={item.id}>
              <StyledFirstRow>{item.name}</StyledFirstRow>
              <StyledSecondRow>{item.number}</StyledSecondRow>
              <td>
                <StyledChangeBtn
                  type="button"
                  onClick={() => onChangeContact(item.id, item.name, item.number)}
                >
                  <IconWrite />
                </StyledChangeBtn>
              </td>
              <td>
                <StyledChangeBtn
                  type="button"
                  onClick={() => onDeleteContact(item.id)}
                >
                  <IconDeleteBin5Fill />
                </StyledChangeBtn>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledContainerTable>
      {isOpenModal && <ModalChange
          modalClose={modalClose}
          id = {id}
          name = {name}
          number = {number}
        />}
    </StyledSection>
  );
}

export default Contacts;
