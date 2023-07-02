import { Notify } from 'notiflix';

export const handlePending = state => {
  state.isLoading = true;
};

export const handleFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.items = payload;
};

export const handleRejected = state => {
  state.isLoading = false;
};

export const handleAddContactFulfilled = (state, { payload }) => {
  state.isLoading = false;
  if (
    state.items.some(item => {
      return item.name.toLowerCase() === payload.name.toLowerCase();
    })
  ) {
    Notify.failure('Такий контакт вже існує!');
    return state;
  }
  Notify.success('Контакт додано!');
  state.items.push(payload);
};

export const handledeleteContactFulfilled = (state, { payload }) => {
  state.isLoading = false;
  Notify.info('Контакт видалено!');
  state.items = state.items.filter(item => item.id !== payload.id);
};

export const handleUpdateContactFulfilled = (state, {payload}) => {
  state.isLoading = false;
  state.items = state.items.filter(item => item.id !== payload.id);
  state.items.push(payload)
};