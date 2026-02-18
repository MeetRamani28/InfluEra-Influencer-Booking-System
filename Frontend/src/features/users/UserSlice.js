import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMyProfile,
  updateMyProfile,
  fetchAllUsers,
  createUser,
  updateUserByAdmin,
  deleteUserByAdmin,
} from "./UserActions";

const initialState = {
  myProfile: null,
  users: [],
  loading: false,
  error: null,
  successMessage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch My Profile
      .addCase(fetchMyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.myProfile = action.payload;
      })
      .addCase(fetchMyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update My Profile
      .addCase(updateMyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.myProfile = action.payload;
        state.successMessage = "Profile updated successfully";
      })
      .addCase(updateMyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All Users (Admin)
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create User (Admin)
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.unshift(action.payload);
        state.successMessage = "User created successfully";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update User (Admin)
      .addCase(updateUserByAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserByAdmin.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id
        );
        if (index !== -1) state.users[index] = action.payload;
        state.successMessage = "User updated successfully";
      })
      .addCase(updateUserByAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete User (Admin)
      .addCase(deleteUserByAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserByAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((u) => u._id !== action.payload);
        state.successMessage = "User deleted successfully";
      })
      .addCase(deleteUserByAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = userSlice.actions;
export default userSlice.reducer;
