import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOverview } from "@/lib/api";

const initialState = {
  overviewText: "",
  items: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

export const fetchOverview = createAsyncThunk(
  "notifications/fetchOverview",
  async () => {
    return getOverview();
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    markAllRead(state) {
      state.unreadCount = 0;
    },
    addNotification(state, action) {
      state.items.unshift(action.payload);
      state.unreadCount += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.overviewText = action.payload.overviewText;
        state.items = action.payload.notifications;
        state.unreadCount = action.payload.notifications.length;
      })
      .addCase(fetchOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load overview";
      });
  },
});

export const { markAllRead, addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
