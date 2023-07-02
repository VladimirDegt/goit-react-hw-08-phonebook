import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { StyledForm, StyledInput } from './Filter.styled';
import { filterContact } from 'redux/contacts/filterReducer';

function Filter() {
  const dispatch = useDispatch();

  return (
    <Formik initialValues={{ vidibleContacts: '' }}>
      {({ values, setFieldValue }) => (
        <StyledForm >
          <label htmlFor="findcontact">Find contacts by name</label>
          <StyledInput
            debounceTimeout={300}
            id="findcontact"
            placeholder='Search...'
            name="vidibleContacts"
            type="text"
            onChange={({ target }) => {
              dispatch(filterContact(target.value));
              setFieldValue('vidibleContacts', target.value);
            }}
            value={values.vidibleContacts}
          />
        </StyledForm>
      )}
    </Formik>
  );
}

export default Filter;
