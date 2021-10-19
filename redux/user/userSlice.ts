import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./userState";

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
