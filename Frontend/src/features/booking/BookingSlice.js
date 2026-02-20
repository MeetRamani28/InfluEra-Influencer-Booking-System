import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./BookingActions";

const initialState = {
  bookings: [],
  loading: false,
  error: null,
  success: false,
  count: 0, // optional: to store total bookings
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
        state.bookings.push(action.payload.booking); // API returns { booking: {...} }
        state.count += 1;
      })
      .addCase(actions.createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // UPDATE BOOKING STATUS
      // ==========================
      .addCase(actions.updateBookingStatus.fulfilled, (state, action) => {
        const updatedBooking = action.payload.booking;
        state.bookings = state.bookings.map((b) =>
          b._id === updatedBooking._id ? updatedBooking : b
        );
      })

      // ==========================
      // CANCEL BOOKING (USER)
      // ==========================
      .addCase(actions.cancelBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.map((b) =>
          b._id === action.payload ? { ...b, status: "CANCELLED" } : b
        );
      })

      // ==========================
      // DELETE BOOKING (ADMIN)
      // ==========================
      .addCase(actions.deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(
          (b) => b._id !== action.payload
        );
        state.count = state.bookings.length;
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
          // ✅ action.payload = { success, count, bookings }
          state.bookings = action.payload.bookings || [];
          state.count = action.payload.count || 0;
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