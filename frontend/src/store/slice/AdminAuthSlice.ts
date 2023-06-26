import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  value: {
    user?: {
      emai: string;
    };
    admin?: boolean;
    accessToken?: string;
    isAuthenticated: boolean;
  };
}

const initialState: AuthState = {
  value: localStorage.getItem("admin")
    ? JSON.parse(localStorage.getItem("admin") || "{}")
    : { isAuthenticated: false },
};

export const AuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    Login(state, action: PayloadAction<object>) {
      state.value = { ...action.payload, isAuthenticated: true };
      localStorage.setItem("admin", JSON.stringify({ ...state.value }));
    },
    LogOut(state) {
      state.value = { isAuthenticated: false };
      localStorage.removeItem("admin");
    },
  },
});
export const { Login, LogOut } = AuthSlice.actions;
export default AuthSlice.reducer;
