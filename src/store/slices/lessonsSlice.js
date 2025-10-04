import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLessons, getStats } from "@/lib/api";

const initialState = {
  stats: {
    inProgress: 0,
    completed: 0,
    categoriesCompleted: 0,
    achievements: 0,
  },
  list: [],
  loading: false,
  error: null,
};

export const fetchStats = createAsyncThunk("lessons/fetchStats", async () =>
  getStats()
);

export const fetchLessons = createAsyncThunk(
  "lessons/fetchLessons",
  async (params) => getLessons(params)
);

const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load stats";
      })
      .addCase(fetchLessons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load lessons";
      });
  },
});

export default lessonsSlice.reducer;
