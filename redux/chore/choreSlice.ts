import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChore } from "../../interfaces/IChore";
import { initialState } from "./choreState";
import { getChores } from "./choreThunk";

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
    deleteChore(state, action: PayloadAction<string>) {
      state.chores = state.chores.filter(
        (chore) => chore.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChores.fulfilled, (state, { payload }) => {
      state.chores.push(...payload);
    });
    builder.addCase(getChores.rejected, (state, { payload }) => {
      state.error = "No data found";
    });
    builder.addCase(getChores.pending, (state, { payload }) => {
      state.loading = true;
    });
  },
});

export const { addChore, editChore, deleteChore } = choreSlice.actions;

export default choreSlice.reducer;
