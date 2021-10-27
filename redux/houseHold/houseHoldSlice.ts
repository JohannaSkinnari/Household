import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHouseHold } from "../../interfaces/IHouseHold";
import { loadData } from "../auth/authThunk";
import { initialState } from "./houseHoldState";
import { createHouseHold } from "./houseHoldThunk";

const houseHoldSlice = createSlice({
  name: "households",
  initialState,
  reducers: {
    editHouseHold(state, action: PayloadAction<IHouseHold>) {
      const index = state.houseHoldList.findIndex(
        (house) => house.id === action.payload.id
      );
      state.houseHoldList[index] = {
        ...state.houseHoldList[index],
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createHouseHold.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isCreatedSuccess = true;
      state.houseHoldList.push(payload);
    });
    builder.addCase(createHouseHold.rejected, (state, { payload }) => {
      state.loading = false;
      state.isCreatedSuccess = false;
      state.error = "No data found";
    });
    builder.addCase(createHouseHold.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(loadData.fulfilled, (state, { payload }) => {
      state.houseHoldList = payload.households;
    });
  },
});

export const { editHouseHold } = houseHoldSlice.actions;

export default houseHoldSlice.reducer;
