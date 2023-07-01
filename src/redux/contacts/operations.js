import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pathsFetch } from "utils/pathsFetch";

export const getContact = createAsyncThunk(
  'contacts/get',
  async (_, thunkAPI) => {
    try {
      const result = await axios(pathsFetch.get);
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/add',
  async (newContact, thunkAPI) => {
    try {
      const result = await axios.post(pathsFetch.add, newContact);
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const result = await axios.delete(`/contacts/${id}`);
      return result.data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);