import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./completedChoreState";

const completedChoreSlice = createSlice({
  name: "completedChores",
  initialState,
  reducers: {},
});

export const {} = completedChoreSlice.actions;

export default completedChoreSlice.reducer;
