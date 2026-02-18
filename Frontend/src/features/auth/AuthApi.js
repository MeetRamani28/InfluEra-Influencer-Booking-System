import api from "../../services/axios";

export const loginAPI = (data) => api.post("/auth/login", data);

export const registerAPI = (data) =>
  api.post("/auth/register", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const logoutAPI = () => api.post("/auth/logout");

export const getProfileAPI = () => api.get("/users/me");

/* =========================
   GOOGLE LOGIN
========================= */

export const googleLoginAPI = () =>
  (window.location.href = "http://localhost:3000/api/auth/google");
