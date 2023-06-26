import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  value: {
    accessToken?: string;
    isAuthenticated: boolean;
  };
}

const initialState: AuthState = {
  value: {
    isAuthenticated: false,
  },
};

export const AuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    Login(state) {
      state.value = {
        accessToken: "fjeiwoj",
        isAuthenticated: true,
      };
    },
    LogOut(state) {
      state.value = { isAuthenticated: false };
    },
  },
});
export const { Login, LogOut } = AuthSlice.actions;
export default AuthSlice.reducer;
