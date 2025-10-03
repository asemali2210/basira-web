import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategories } from "@/lib/api";
import type { CategoryItem } from "@/lib/api";

export interface CategoriesState {
  items: CategoryItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk<CategoryItem[]>(
  "categories/fetchCategories",
  async () => getCategories()
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load categories";
      });
  },
});

export default categoriesSlice.reducer;
