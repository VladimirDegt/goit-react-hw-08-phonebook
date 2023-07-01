import { createSlice, isAnyOf  } from '@reduxjs/toolkit';
import { contactsInitialState } from './initial';
import { addContact, deleteContact, getContact } from './operations';
import { handleAddContactFulfilled, handleFulfilled, handlePending, handleRejected, handledeleteContactFulfilled } from './handlers';

const STATUS = {
  pending: 'pending',
  rejected: 'rejected',
};
const { pending, rejected } = STATUS;
const funcList = [getContact, addContact, deleteContact];
const funcUpdate = status => funcList.map(item => item[status]);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,

  extraReducers: builder => {
    builder
      .addCase(getContact.fulfilled, handleFulfilled)
      .addCase(addContact.fulfilled, handleAddContactFulfilled)
      .addCase(deleteContact.fulfilled, handledeleteContactFulfilled)
      .addMatcher(isAnyOf(...funcUpdate(pending)), handlePending)
      .addMatcher(isAnyOf(...funcUpdate(rejected)), handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;