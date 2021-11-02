import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadData } from "../auth/authThunk";
import { initialState } from "./completedChoreState";
import {
  createCompletedChore,
  deleteCompletedChore,
} from "./completedChoreThunk";

const completedChoreSlice = createSlice({
  name: "completedChores",
  initialState,
  reducers: {
    removeCompletedChoreState(state, action: PayloadAction<[]>) {
      state.completedChores = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(createCompletedChore.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isCreatedSuccess = true;
      state.completedChores.push(payload);
    });
    builder.addCase(createCompletedChore.rejected, state => {
      state.loading = false;
      state.isCreatedSuccess = false;
      state.error = "No data found";
    });
    builder.addCase(createCompletedChore.pending, state => {
      state.loading = true;
    });

    builder.addCase(deleteCompletedChore.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isCreatedSuccess = true;
      state.completedChores = state.completedChores.filter(
        chore => chore.choreId !== payload
      );
    });
    builder.addCase(deleteCompletedChore.rejected, state => {
      state.loading = false;
      state.isCreatedSuccess = false;
      state.error = "No data found";
    });
    builder.addCase(deleteCompletedChore.pending, state => {
      state.loading = true;
    });
    builder.addCase(loadData.fulfilled, (state, { payload }) => {
      state.completedChores = payload.completedChores;
      state.loading = false;
    });
    builder.addCase(loadData.rejected, state => {
      state.loading = false;
    });
    builder.addCase(loadData.pending, state => {
      state.loading = true;
    });
  },
});

export const { removeCompletedChoreState } = completedChoreSlice.actions;

export default completedChoreSlice.reducer;
