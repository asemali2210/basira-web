import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from "./slices/notificationsSlice";
import categoriesReducer from "./slices/categoriesSlice";
import lessonsReducer from "./slices/lessonsSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      notifications: notificationsReducer,
      categories: categoriesReducer,
      lessons: lessonsReducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
