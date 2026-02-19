import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchInfluencerDashboardAPI,
  fetchAllInfluencersAPI,
} from "./influencerAPI";

// Fetch Influencer Dashboard Stats
export const fetchInfluencerDashboard = createAsyncThunk(
  "influencer/dashboard",
  async (_, thunkAPI) => {
    try {
      const res = await fetchInfluencerDashboardAPI();
      return res.data; // ✅ FIXED
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch dashboard"
      );
    }
  }
);

// Fetch all active influencers
export const fetchAllInfluencers = createAsyncThunk(
  "influencer/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllInfluencersAPI();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch influencers"
      );
    }
  }
);
