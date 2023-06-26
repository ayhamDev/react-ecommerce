import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slice/AuthSlice.ts";
import AdminAuthSlice from "./slice/AdminAuthSlice.ts";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    adminAuth: AdminAuthSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
