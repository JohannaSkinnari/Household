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
    editChore(state, action: PayloadAction<IChore>) {
      const index = state.chores.findIndex(
        (chore) => chore.id === action.payload.id
      );
      state.chores[index] = {
        ...state.chores[index],
        ...action.payload,
      };
    },
  },
});

export const { addChore } = choreSlice.actions;

export default choreSlice.reducer;
