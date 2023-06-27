import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initial";
import { register } from "./operations";

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder =>
   builder
   .addCase(register.pending, (state, {payload}) => state)
   .addCase(register.fulfilled, (state, {payload}) => {
    state.user = payload.user;
    state.token = payload.token;
    state.isLoggedIn = true;
  })
   .addCase(register.rejected, (state, {payload}) => state)

});

export const authReducer = authSlice.reducer;
