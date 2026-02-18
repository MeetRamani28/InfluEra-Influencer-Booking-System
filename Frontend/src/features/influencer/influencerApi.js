import api from "../../services/axios";

// Get Influencer Dashboard Stats
export const fetchInfluencerDashboardAPI = async () => {
  const response = await api.get("/influencer/dashboard");
  return response.data;
};

export const fetchAllInfluencersAPI = async () => {
  const response = await api.get("/influencer");
  return response.data; // { success: true, influencers: [...] }
};
