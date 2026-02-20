import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategories,
  fetchSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./CategoryActions";

const initialState = {
  categories: [],
  category: null,
  loading: false,
  error: null,
  success: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearCategoryState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // ===============================
      // FETCH ALL
      // ===============================
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===============================
      // FETCH SINGLE
      // ===============================
      .addCase(fetchSingleCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload.category;
      })
      .addCase(fetchSingleCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===============================
      // CREATE
      // ===============================
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.categories.push(action.payload.category);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===============================
      // UPDATE
      // ===============================
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const index = state.categories.findIndex(
          (cat) => cat._id === action.payload.category._id
        );

        if (index !== -1) {
          state.categories[index] = action.payload.category;
        }
      })

      // ===============================
      // DELETE (Soft Delete)
      // ===============================
      // eslint-disable-next-line no-unused-vars
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      });
  },
});

export const { clearCategoryState } = categorySlice.actions;
export default categorySlice.reducer;
