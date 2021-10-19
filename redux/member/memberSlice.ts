import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./memberState";

const memberSlice = createSlice({
  name: "members",
  initialState,
  reducers: {},
});

export const {} = memberSlice.actions;

export default memberSlice.reducer;
