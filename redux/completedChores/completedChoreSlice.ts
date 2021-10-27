import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./completedChoreState";
import { createCompletedChore } from "./completedChoreThunk";

const completedChoreSlice = createSlice({
  name: "completedChores",
  initialState,
  reducers: {},
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
  },
});

export const {} = completedChoreSlice.actions;

export default completedChoreSlice.reducer;
