import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initial";
import { logIn, logOut, register } from "./operations";

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder =>
   builder
   .addCase(register.pending, state => state)
   .addCase(register.fulfilled, (state, {payload}) => {
    state.user = payload.user;
    state.token = payload.token;
    state.isLoggedIn = true;
  })
   .addCase(register.rejected, (state, {payload}) => {
    state.isLoggedIn = false;
    console.log('error.message :>> ', payload);
   })
   .addCase(logIn.fulfilled, (state, {payload}) => {
    state.user = payload.user;
    state.token = payload.token;
    state.isLoggedIn = true;
   })
   .addCase(logOut.fulfilled, state => {
    state.user = {name: null, email: null};
    state.token = null;
    state.isLoggedIn = false;
   })
});

export const authReducer = authSlice.reducer;
