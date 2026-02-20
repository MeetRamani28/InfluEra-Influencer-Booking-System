import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./BookingActions";

const initialState = {
  bookings: [],
  loading: false,
  error: null,
  success: false,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    clearBookingState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ==========================
      // CREATE BOOKING
      // ==========================
      .addCase(actions.createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(actions.createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.bookings.push(action.payload.booking);
      })
      .addCase(actions.createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // UPDATE BOOKING
      // ==========================
      .addCase(actions.updateBookingStatus.fulfilled, (state, action) => {
        const updated = action.payload.booking;

        state.bookings = state.bookings.map((b) =>
          b._id === updated._id ? updated : b
        );
      })

      // ==========================
      // CANCEL BOOKING
      // ==========================
      .addCase(actions.cancelBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.map((b) =>
          b._id === action.payload ? { ...b, status: "CANCELLED" } : b
        );
      })

      // ==========================
      // DELETE BOOKING
      // ==========================
      .addCase(actions.deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter((b) => b._id !== action.payload);
      })

      // ==========================
      // FETCH BOOKINGS (USER / ADMIN / INFLUENCER)
      // ==========================
      .addMatcher(
        (action) =>
          action.type.startsWith("booking/fetch") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("booking/fetch") &&
          action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.loading = false;
          state.bookings = action.payload.bookings;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("booking/fetch") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
