import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  value: {
    user?: object;
    accessToken?: string;
    isAuthenticated: boolean;
  };
}

const initialState: AuthState = {
  value: {
    isAuthenticated: true,
  },
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Login(state) {
      state.value = {
        user: {},
        accessToken: "fjeiwoj",
      };
    },
    LogOut(state) {
      state.value = {};
    },
  },
});
export const { Login, LogOut } = AuthSlice.actions;
export default AuthSlice.reducer;
