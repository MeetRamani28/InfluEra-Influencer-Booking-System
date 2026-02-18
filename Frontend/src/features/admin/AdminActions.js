import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardStatsAPI } from "./AdminApi";

export const fetchAdminDashboardStats = createAsyncThunk(
  "admin/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getDashboardStatsAPI();
      return data.data; // returns totalUsers, totalInfluencers, totalBookingsToday, etc.
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
