import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMyProfileAPI,
  updateMyProfileAPI,
  getAllUsersAPI,
  createUserAPI,
  updateUserByAdminAPI,
  deleteUserByAdminAPI,
} from "./UserApi";

// USER: My Profile
export const fetchMyProfile = createAsyncThunk(
  "user/fetchMyProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getMyProfileAPI();
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateMyProfile = createAsyncThunk(
  "user/updateMyProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const { data } = await updateMyProfileAPI(profileData);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ADMIN: Users Management
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getAllUsersAPI();
      return data.users;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await createUserAPI(userData);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateUserByAdmin = createAsyncThunk(
  "user/updateUserByAdmin",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const { data } = await updateUserByAdminAPI(id, updateData);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteUserByAdmin = createAsyncThunk(
  "user/deleteUserByAdmin",
  async (id, { rejectWithValue }) => {
    try {
      await deleteUserByAdminAPI(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
