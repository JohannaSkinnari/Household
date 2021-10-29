import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./memberState";
import {
  activateMember,
  createMember,
  createOwner,
  pauseMember,
} from "./memberThunk";

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

    builder.addCase(pauseMember.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isCreatedSuccess = true;
      console.log("pauseSlice");
      const index = state.members.findIndex(m => m.id === payload.id);
      state.members[index] = {
        ...state.members[index],
        ...payload,
      };
      console.log(state.members[index]);
    });
    builder.addCase(pauseMember.rejected, state => {
      state.loading = false;
      state.isCreatedSuccess = false;
      state.error = "No data found";
    });
    builder.addCase(pauseMember.pending, state => {
      state.loading = true;
    });

    builder.addCase(activateMember.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isCreatedSuccess = true;
      console.log("activateSlice");

      const index = state.members.findIndex(m => m.id === payload.id);
      state.members[index] = {
        ...state.members[index],
        ...payload,
      };
      console.log(state.members[index]);
    });
    builder.addCase(activateMember.rejected, state => {
      state.loading = false;
      state.isCreatedSuccess = false;
      state.error = "No data found";
    });
    builder.addCase(activateMember.pending, state => {
      state.loading = true;
    });
  },
});

export const {} = memberSlice.actions;

export default memberSlice.reducer;
