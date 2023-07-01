import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Notify } from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyledSection,
  StyledForm,
  StyledButton,
  StyledErrorContainer,
} from './AddContactsForm.styled';
import { addContact } from 'redux/contacts/operations';
import { selectContactsState } from 'redux/contacts/selectors';

function AddContactsForm() {
  const dispatch = useDispatch();
  const {isLoading} = useSelector(selectContactsState)

  const handleSubmit = e => {
    const form = e.target;
    e.preventDefault();

    dispatch(addContact({
        name: form.elements.name.value,
        number: form.elements.number.value,
      }))  

    form.reset();
  };

  return (
    <section>
      {isLoading && <p>Loading...</p>}
      <form autoComplete="on" onSubmit={handleSubmit}>
        <label >
          Name
          <input type="text" name="name" />
        </label>
        <label >
          Number
          <input type="tel" name="number" />
        </label>
        <button type="submit">Добавить контакт</button>
      </form>
    </section>
  );
}

export default AddContactsForm;
