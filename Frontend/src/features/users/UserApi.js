import api from "../../services/axios";

const API_BASE = "/users";

export const getMyProfileAPI = () => api.get(`${API_BASE}/me`);
export const updateMyProfileAPI = (profileData) =>
  api.put(`${API_BASE}/me`, profileData);

export const getAllUsersAPI = () => api.get(API_BASE);
export const createUserAPI = (userData) => api.post(API_BASE, userData);
export const updateUserByAdminAPI = (id, updateData) =>
  api.put(`${API_BASE}/${id}`, updateData);
export const deleteUserByAdminAPI = (id) => api.delete(`${API_BASE}/${id}`);
