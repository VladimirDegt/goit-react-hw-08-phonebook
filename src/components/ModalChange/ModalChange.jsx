import { useEffect, useState } from 'react';
import {
  StyledBackdrop,
  StyledModal,
  StyledButtonClose,
  StyledTitleModal,
  StyledFormModal,
  StyledInputModal,
  StyledButtonModal,
} from './ModalChange.styled';
import IconClose from 'utils/close-svg';
import { Notify } from 'notiflix';
import { useDispatch } from 'react-redux';
import { updateContact } from 'redux/contacts/operations';

export function ModalChange(props) {
  const dispatch = useDispatch();
  const { modalClose } = props;
  const [id] = useState(props.id);
  const [name, setName] = useState(props.name);
  const [number, setNumber] = useState(props.number);

  useEffect(() => {
    function handleEsc(e) {
      if (e.code === 'Escape') {
        modalClose();
      }
    }

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [modalClose]);

  function handleInputVisible({ target }) {
    switch (target.name) {
      case 'name':
        setName(target.value);
        break;
      case 'number':
        setNumber(target.value);
        break;
      default:
        return;
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;

    // dispatch(
    //   updateContact({
    //     email: form.elements.email.value,
    //     password: form.elements.password.value,
    //   })
    // )
        dispatch(updateContact(id))
      .unwrap()
      .then(() => {
        Notify.success('Контакт оновлено!', {
          position: 'center-top',
          distance: '100px',
        });
      })
      .catch(() => Notify.failure('Щось пішло не так'));
    form.reset();
    modalClose()
  }


  function handleClickBackdrop(e) {
    if (e.target !== e.currentTarget) {
      return;
    }
    modalClose();
  }

  function handlerModalClose() {
    modalClose();
  }

  return (
    <StyledBackdrop onClick={handleClickBackdrop}>
      <StyledModal>
        <StyledButtonClose type="button" onClick={handlerModalClose}>
          <IconClose />
        </StyledButtonClose>
        <StyledFormModal onSubmit={handleFormSubmit}>
          <StyledTitleModal>Інформація про контакт</StyledTitleModal>
          <StyledInputModal
            type="text"
            autoComplete="on"
            placeholder="Ім'я"
            name="name"
            required
            onChange={handleInputVisible}
            value={name}
          />
          <StyledInputModal
            type="text"
            autoComplete="on"
            placeholder="Номер"
            name="number"
            onChange={handleInputVisible}
            value={number}
          />
          <StyledButtonModal type="submit">Підтвердити</StyledButtonModal>
        </StyledFormModal>
      </StyledModal>
    </StyledBackdrop>
  );
}
