import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCategoriesAPI,
  fetchSingleCategoryAPI,
  createCategoryAPI,
  updateCategoryAPI,
  deleteCategoryAPI,
} from "./categoryAPI";

// Get All Categories
export const fetchCategories = createAsyncThunk(
  "category/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchCategoriesAPI();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Get Single Category
export const fetchSingleCategory = createAsyncThunk(
  "category/fetchSingle",
  async (id, { rejectWithValue }) => {
    try {
      return await fetchSingleCategoryAPI(id);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Create Category
export const createCategory = createAsyncThunk(
  "category/create",
  async (data, { rejectWithValue }) => {
    try {
      return await createCategoryAPI(data);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Update Category
export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateCategoryAPI({ id, data });
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Delete Category
export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteCategoryAPI(id);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
