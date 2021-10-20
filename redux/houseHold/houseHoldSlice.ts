import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHouseHold } from "../../interfaces/IHouseHold";
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
      state.houseHoldList.push(payload);
    });
    builder.addCase(createHouseHold.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = "No data found";
    });
    builder.addCase(createHouseHold.pending, (state, { payload }) => {
      state.loading = true;
    });
  },
});

export const { editHouseHold } = houseHoldSlice.actions;

export default houseHoldSlice.reducer;
