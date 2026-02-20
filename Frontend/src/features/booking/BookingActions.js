import { createAsyncThunk } from "@reduxjs/toolkit";
import * as bookingApi from "./bookingApi";

// CREATE BOOKING
export const createBooking = createAsyncThunk(
  "booking/create",
  async (data, { rejectWithValue }) => {
    try {
      const { data: response } = await bookingApi.createBookingApi(data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Booking Creation Failed"
      );
    }
  }
);

// GET MY BOOKINGS (USER)
export const getMyBookings = createAsyncThunk(
  "booking/fetchMyBookings",
  async (_, thunkAPI) => {
    try {
      const res = await bookingApi.getMyBookingsApi();
      return res.data; // ✅ return full object
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch bookings"
      );
    }
  }
);

// GET ALL BOOKINGS (ADMIN)
export const getAllBookings = createAsyncThunk(
  "booking/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await bookingApi.getAllBookingsApi();
      return data; // ✅ returns { success, count, bookings }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch bookings"
      );
    }
  }
);

// GET INFLUENCER BOOKINGS
export const getInfluencerBookings = createAsyncThunk(
  "booking/fetchInfluencerBookings",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await bookingApi.getInfluencerBookingsApi();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to Fetch Influencer Bookings"
      );
    }
  }
);

// UPDATE BOOKING (ADMIN)
export const updateBooking = createAsyncThunk(
  "booking/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const { data: response } = await bookingApi.updateBookingApi(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update Failed");
    }
  }
);

// CANCEL BOOKING (USER)
export const cancelBooking = createAsyncThunk(
  "booking/cancel",
  async (id, { rejectWithValue }) => {
    try {
      await bookingApi.cancelBookingApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Cancel Failed");
    }
  }
);

// DELETE BOOKING (ADMIN)
export const deleteBooking = createAsyncThunk(
  "booking/delete",
  async (id, { rejectWithValue }) => {
    try {
      await bookingApi.deleteBookingApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Delete Failed");
    }
  }
);

// UPDATE STATUS (INFLUENCER)
export const updateBookingStatus = createAsyncThunk(
  "booking/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await bookingApi.updateBookingStatusApi(id, status);
      return data; // contains { booking }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Status Update Failed"
      );
    }
  }
);
