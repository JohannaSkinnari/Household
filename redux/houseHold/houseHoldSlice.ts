import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICreateHouseHold, IEditHouseHold, IHouseHold } from "../../interfaces/IHouseHold";
import { loadBackgroundData, loadData } from "../auth/authThunk";
import { initialState } from "./houseHoldState";
import { createHouseHold, editHouseHold } from "./houseHoldThunk";

const houseHoldSlice = createSlice({
  name: "households",
  initialState,
  reducers: {
    removeHouseholdState(state, action: PayloadAction<[]>) {
      state.houseHoldList = action.payload;
      state.otherHouseholds = action.payload;
    },
    // editHouseHold(state, action: PayloadAction<IEditHouseHold>) {
    //   const index = state.houseHoldList.findIndex(
    //     house => house.id === action.payload.id
    //   );
    //   state.houseHoldList[index] = {
    //     ...state.houseHoldList[index],
    //     ...action.payload,
    //   };
    // },
  },
  extraReducers: builder => {
    builder.addCase(createHouseHold.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isCreatedSuccess = true;
      state.houseHoldList.push(payload);
    });
    builder.addCase(createHouseHold.rejected, state => {
      state.loading = false;
      state.isCreatedSuccess = false;
      state.error = "No data found";
    });
    builder.addCase(createHouseHold.pending, state => {
      state.loading = true;
    });
    builder.addCase(loadData.fulfilled, (state, { payload }) => {
      state.houseHoldList = payload.households;
      state.loading = false;
    });
    builder.addCase(loadData.rejected, state => {
      state.loading = false;
      state.error = "No data found";
    });
    builder.addCase(loadData.pending, state => {
      state.loading = true;
    });
    builder.addCase(loadBackgroundData.fulfilled, (state, { payload }) => {
      state.otherHouseholds = payload;
      state.loading = false;
    });
    builder.addCase(loadBackgroundData.rejected, state => {
      state.loading = false;
      state.error = "No data found";
    });
    builder.addCase(loadBackgroundData.pending, state => {
      state.loading = true;
    });
    builder.addCase(editHouseHold.fulfilled, (state, { payload }) => {
      const index = state.houseHoldList.findIndex(
            house => house.id === payload.id
          );
          state.houseHoldList[index] = {
            ...state.houseHoldList[index],
            ...payload,
          }
      state.loading = false;
    });
    builder.addCase(editHouseHold.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(editHouseHold.rejected, (state, { payload }) => {
      state.error = "No household found"
      state.loading = false;
    });
  }
});  

export const { removeHouseholdState } = houseHoldSlice.actions;

export default houseHoldSlice.reducer;
