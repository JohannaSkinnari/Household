import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHouseHold } from "../../interfaces/IHouseHold";
import { initialState } from "./houseHoldState";

const houseHoldSlice = createSlice({
  name: "households",
  initialState,
  reducers: {
    addHouseHold(state, action: PayloadAction<IHouseHold>) {
      const randomNumber = Math.floor(Math.random() * 90000) + 10000;
      let newHousehold = action.payload;
      newHousehold.houseHoldCode = randomNumber;
      state.houseHoldList.push(newHousehold);
    },
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
});

export const { addHouseHold } = houseHoldSlice.actions;

export default houseHoldSlice.reducer;
