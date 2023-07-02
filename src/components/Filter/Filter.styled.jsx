import styled from '@emotion/styled';
import { Form } from 'formik';
import { DebounceInput } from 'react-debounce-input';
import { displayFlex } from 'utils/display-flex';

export const StyledForm = styled(Form)`
  ${displayFlex}
  gap: 5px;
  border: 1px solid grey;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`
export const StyledInput = styled(DebounceInput)`
  padding: 8px;
  border-radius: 4px;
`