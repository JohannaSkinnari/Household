import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadData } from "../auth/authThunk";
import { initialState } from "./memberState";
import {
  activateMember,
  createMember,
  createOwner,
  getAvailableAvatars,
  pauseMember,
} from "./memberThunk";

const memberSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    removeMemberState(state, action: PayloadAction<[]>) {
      state.householdMembers = action.payload;
    },
  },
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
    builder.addCase(loadData.fulfilled, (state, { payload }) => {
      state.members = payload.members;
      state.householdMembers = payload.houseHoldMembers;
    });
    builder.addCase(getAvailableAvatars.fulfilled, (state, { payload }) => {
      state.availableHouseholdMemberAvatars = payload;
      state.loading = false;
    });
    builder.addCase(getAvailableAvatars.rejected, state => {
      state.loading = false;
      state.error = "No data found";
    });
    builder.addCase(getAvailableAvatars.pending, state => {

    builder.addCase(pauseMember.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isCreatedSuccess = true;
      const index = state.members.findIndex(m => m.id === payload.id);
      state.members[index] = {
        ...state.members[index],
        ...payload,
      };
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
      const index = state.members.findIndex(m => m.id === payload.id);
      state.members[index] = {
        ...state.members[index],
        ...payload,
      };
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

export const { removeMemberState } = memberSlice.actions;

export default memberSlice.reducer;
