import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChore } from "../../interfaces/IChore";
import { initialState } from "./choreState";

const choreSlice = createSlice({
  name: "chores",
  initialState,
  reducers: {
    addChore(state, action: PayloadAction<IChore>) {
      state.chores.push(action.payload);
    },
  },
});

export const { addChore } = choreSlice.actions;

export default choreSlice.reducer;
