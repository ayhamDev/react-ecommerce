import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  value: {
    User?: object;
    accessToken?: string;
    isAuthenticated: boolean;
  };
}

const initialState: AuthState = {
  value: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : { isAuthenticated: false },
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Login(state, action: PayloadAction<object>) {
      state.value = { ...action.payload, isAuthenticated: true };
      localStorage.setItem("user", JSON.stringify({ ...state.value }));
    },
    LogOut(state) {
      state.value = { isAuthenticated: false };
      localStorage.removeItem("user");
    },
  },
});
export const { Login, LogOut } = AuthSlice.actions;
export default AuthSlice.reducer;
