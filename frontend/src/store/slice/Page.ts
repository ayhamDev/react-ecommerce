import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PageState {
  value: string;
}

const initialState: PageState = {
  value: "home",
};
export const Page = createSlice({
  name: "page",
  initialState,
  reducers: {
    SetName(state, action: PayloadAction<string>) {
      state.value = action.payload;
      document.title = state.value;
    },
  },
});
export const { SetName } = Page.actions;
export default Page.reducer;
