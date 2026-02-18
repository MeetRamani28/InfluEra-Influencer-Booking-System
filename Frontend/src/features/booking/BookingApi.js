import api from "../../services/axios";

// ===============================
// BOOKING API CALLS
// ===============================

export const createBookingApi = (data) => api.post("/bookings", data);

export const getMyBookingsApi = () => api.get("/bookings/my");

export const getAllBookingsApi = () => api.get("/bookings");

export const getInfluencerBookingsApi = () => api.get("/bookings/influencer");

export const updateBookingApi = (id, data) => api.put(`/bookings/${id}`, data);

export const cancelBookingApi = (id) => api.put(`/bookings/${id}/cancel`);

export const deleteBookingApi = (id) => api.delete(`/bookings/${id}`);

export const updateBookingStatusApi = (id, status) =>
  api.put(`/bookings/${id}/status`, { status });
