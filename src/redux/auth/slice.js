import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { initialState } from "./initial";
import { logIn, logOut, refreshUser, register } from "./operations";

const handlePending = state =>{
  state.isLoading = true
 };

const handleFulfilled = (state, {payload}) =>{
    state.user = payload.user;
    state.token = payload.token;
    state.isLoggedIn = true;
    state.isLoading = false;
};

const handleRejected = state =>{
  state.isLoggedIn = false
  state.isLoading = false
 };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder =>
   builder
   .addCase(logOut.fulfilled, state => {
    state.user = {name: null, email: null};
    state.token = null;
    state.isLoggedIn = false;
   })
   .addCase(refreshUser.pending, state => {
    state.isRefreshing = true
   })
   .addCase(refreshUser.fulfilled, (state, {payload}) => {
    state.user = payload;
    state.isLoggedIn = true;
    state.isRefreshing = false;
   })
   .addCase(refreshUser.rejected, state => {
    state.isRefreshing = false
   })
   .addMatcher(isAnyOf(register.pending, logIn.pending, logOut.pending), handlePending)
   .addMatcher(isAnyOf(register.rejected, logIn.rejected, logOut.rejected), handleRejected)
   .addMatcher(isAnyOf(register.fulfilled, logIn.fulfilled ), handleFulfilled)

});

export const authReducer = authSlice.reducer;
