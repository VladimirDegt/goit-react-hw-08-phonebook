import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { initialState } from './initial';
import { logIn, logOut, refreshUser, register } from './operations';
import {
  handleFulfilled,
  handleLogOutFulfilled,
  handlePending,
  handleRefreshUserFulfilled,
  handleRefreshUserPending,
  handleRefreshUserRejected,
  handleRejected,
} from './handlers';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(logOut.fulfilled, handleLogOutFulfilled)
      .addCase(refreshUser.pending, handleRefreshUserPending)
      .addCase(refreshUser.fulfilled, handleRefreshUserFulfilled)
      .addCase(refreshUser.rejected, handleRefreshUserRejected)
      .addMatcher(
        isAnyOf(register.pending, logIn.pending, logOut.pending),
        handlePending
      )
      .addMatcher(
        isAnyOf(register.rejected, logIn.rejected, logOut.rejected),
        handleRejected
      )
      .addMatcher(
        isAnyOf(register.fulfilled, logIn.fulfilled),
        handleFulfilled
      ),
});

export const authReducer = authSlice.reducer;
