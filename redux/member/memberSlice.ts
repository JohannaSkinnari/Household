import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./memberState";
import { createMember, createOwner } from "./memberThunk";

const memberSlice = createSlice({
  name: "members",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createMember.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.members.push(payload);
    });
    builder.addCase(createMember.rejected, state => {
      state.loading = false;
      state.error = "No data found";
    });
    builder.addCase(createMember.pending, state => {
      state.loading = true;
    });
    builder.addCase(createOwner.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.members.push(payload);
    });
    builder.addCase(createOwner.rejected, state => {
      state.loading = false;
      state.error = "No data found";
    });
    builder.addCase(createOwner.pending, state => {
      state.loading = true;
    });
  },
});

export const {} = memberSlice.actions;

export default memberSlice.reducer;
