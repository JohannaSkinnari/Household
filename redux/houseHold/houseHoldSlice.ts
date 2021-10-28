import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICreateHouseHold, IEditHouseHold, IHouseHold } from "../../interfaces/IHouseHold";
import { initialState } from "./houseHoldState";
import { createHouseHold } from "./houseHoldThunk";

const houseHoldSlice = createSlice({
  name: "households",
  initialState,
  reducers: {
    editHouseHold(state, action: PayloadAction<IEditHouseHold>) {
      const index = state.houseHoldList.findIndex(
        house => house.id === action.payload.id
      );
      state.houseHoldList[index] = {
        ...state.houseHoldList[index],
        ...action.payload,
      };
    },
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
      //   builder.addCase(editHouseHold.fulfilled, (state, { payload }) => {
      //   state.loading = false;
      //   state.isCreatedSuccess = true;
      //   state.houseHoldList.push(...payload, {id:"", name: "", houseHoldCode:0});
      // });
      // builder.addCase(editHouseHold.rejected, (state, { payload }) => {
      //   state.loading = false;
      //   state.isCreatedSuccess = false;
      //   state.error = "No data found";
      // });
      // builder.addCase(editHouseHold.pending, (state, { payload }) => {
      //   state.loading = true;
      // });
  },
});

export const { editHouseHold } = houseHoldSlice.actions;

export default houseHoldSlice.reducer;
