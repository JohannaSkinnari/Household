import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadData } from "../auth/authThunk";
import { initialState } from "./memberState";
import {
  acceptMember,
  activateMember,
  createMember,
  createOwner,
  deleteHouseHoldMember,
  getAvailableAvatars,
  makeOwner,
  pauseMember,
  rejectMember,
  unMakeOwner,
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
      state.loading = true;
    });

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

    builder.addCase(acceptMember.fulfilled, (state, { payload }) => {
      const index = state.householdMembers.findIndex(m => m.id === payload.id);
      state.householdMembers[index] = {
        ...state.householdMembers[index],
        ...payload,
      };
      state.isCreatedSuccess = true;
      state.loading = false;
    });
    builder.addCase(acceptMember.rejected, state => {
      state.loading = false;
      state.isCreatedSuccess = false;
      state.error = "No data found";
    });
    builder.addCase(acceptMember.pending, state => {
      state.loading = true;
    });

    builder.addCase(rejectMember.fulfilled, (state, { payload }) => {
      state.householdMembers = state.householdMembers.filter(
        m => m.id !== payload
      );
      state.isCreatedSuccess = true;
      state.loading = false;
    });
    builder.addCase(rejectMember.rejected, state => {
      state.loading = false;
      state.isCreatedSuccess = false;
      state.error = "No data found";
    });
    builder.addCase(rejectMember.pending, state => {
      state.loading = true;
    });
    builder.addCase(makeOwner.fulfilled, (state, { payload }) => {
      state.householdMembers = state.householdMembers.filter(
        m => m.id === payload.id
      );
      state.isCreatedSuccess = true;
      state.loading = false;
    });
    builder.addCase(makeOwner.pending, state => {
      state.loading = true;
    });
    builder.addCase(makeOwner.rejected, state => {
      state.loading = false;
      state.isCreatedSuccess = false;
      state.error = "Error occurred";
    });
    builder.addCase(unMakeOwner.fulfilled, (state, { payload }) => {
      state.householdMembers = state.householdMembers.filter(
        m => m.id === payload.id
      );
      state.isCreatedSuccess = true;
      state.loading = false;
    });
    builder.addCase(unMakeOwner.pending, state => {
      state.loading = true;
    });
    builder.addCase(unMakeOwner.rejected, state => {
      state.loading = false;
      state.isCreatedSuccess = false;
      state.error = "Error occurred";
    });
    builder.addCase(deleteHouseHoldMember.fulfilled, (state, { payload }) => {
      state.members = state.members.filter(m => m.id !== payload);
      state.loading = false;
    });
    builder.addCase(deleteHouseHoldMember.pending, state => {
      state.loading = true;
    });
    builder.addCase(deleteHouseHoldMember.rejected, state => {
      state.error = "No member found";
      state.loading = false;
    });
  },
});

export const { removeMemberState } = memberSlice.actions;

export default memberSlice.reducer;
