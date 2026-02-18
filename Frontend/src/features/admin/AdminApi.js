import api from "../../services/axios";

const API_BASE = "/admin";

export const getDashboardStatsAPI = () => api.get(`${API_BASE}/dashboard`);
