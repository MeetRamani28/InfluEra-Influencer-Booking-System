import api from "../../services/axios";

// Get All Active Categories (Public)
export const fetchCategoriesAPI = async () => {
  const response = await api.get("/categories");
  return response.data;
};

// Get Single Category
export const fetchSingleCategoryAPI = async (id) => {
  const response = await api.get(`/categories/${id}`);
  return response.data;
};

// Create Category (Admin)
export const createCategoryAPI = async (data) => {
  const response = await api.post("/categories", data);
  return response.data;
};

// Update Category (Admin)
export const updateCategoryAPI = async ({ id, data }) => {
  const response = await api.put(`/categories/${id}`, data);
  return response.data;
};

// Delete Category (Soft Delete - Admin)
export const deleteCategoryAPI = async (id) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};
