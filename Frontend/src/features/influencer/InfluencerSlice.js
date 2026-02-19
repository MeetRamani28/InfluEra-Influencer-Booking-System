import { createSlice } from "@reduxjs/toolkit";
import {
  fetchInfluencerDashboard,
  fetchAllInfluencers,
} from "./InfluencerActions";

const initialState = {
  stats: {
    totalBookings: 0,
    upcomingBookings: 0,
    cancelledBookings: 0,
    completedBookings: 0,
  },
  influencers: [],
  loadingStats: false,
  loadingInfluencers: false,
  errorStats: null,
  errorInfluencers: null,
};

const influencerSlice = createSlice({
  name: "influencer",
  initialState,
  reducers: {
    clearInfluencerState: (state) => {
      state.loadingStats = false;
      state.loadingInfluencers = false;
      state.errorStats = null;
      state.errorInfluencers = null;
    },
  },
  extraReducers: (builder) => {
    // Dashboard stats
    builder
      .addCase(fetchInfluencerDashboard.pending, (state) => {
        state.loadingStats = true;
        state.errorStats = null;
      })
      .addCase(fetchInfluencerDashboard.fulfilled, (state, action) => {
        state.loadingStats = false;
        state.stats = action.payload;
      })
      .addCase(fetchInfluencerDashboard.rejected, (state, action) => {
        state.loadingStats = false;
        state.errorStats = action.payload;
      });

    // All influencers
    builder
      .addCase(fetchAllInfluencers.pending, (state) => {
        state.loadingInfluencers = true;
        state.errorInfluencers = null;
      })
      .addCase(fetchAllInfluencers.fulfilled, (state, action) => {
        state.loadingInfluencers = false;
        state.influencers = action.payload.influencers;
      })
      .addCase(fetchAllInfluencers.rejected, (state, action) => {
        state.loadingInfluencers = false;
        state.errorInfluencers = action.payload;
      });
  },
});

export const { clearInfluencerState } = influencerSlice.actions;
export default influencerSlice.reducer;
