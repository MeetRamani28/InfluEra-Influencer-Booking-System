import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginAPI,
  registerAPI,
  logoutAPI,
  getProfileAPI,
  googleLoginAPI,
} from "./AuthApi";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await loginAPI(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const googleLoginUser = createAsyncThunk(
  "auth/google",
  async (_, thunkAPI) => {
    try {
      googleLoginAPI();
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      return thunkAPI.rejectWithValue("Google login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await registerAPI(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "users/me",
  async (_, thunkAPI) => {
    try {
      const res = await getProfileAPI();
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await logoutAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
