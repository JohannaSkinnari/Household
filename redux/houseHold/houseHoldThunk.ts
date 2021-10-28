import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICreateHouseHold, IEditHouseHold, IHouseHold } from "../../interfaces/IHouseHold";
import { ICreateMember } from "../../interfaces/IMember";
import { createOwner } from "../member/memberThunk";
import { ThunkApi } from "../reduxStore";

interface ThunkParam {
  house: ICreateHouseHold;
  member: Omit<ICreateMember, "householdId">;
}

export const createHouseHold = createAsyncThunk<
  IHouseHold,
  ThunkParam,
  ThunkApi
>("household/createHouseHold", async (createData, { dispatch }) => {
  // servern ska lösa det här istället.
  const household: IHouseHold = {
    ...createData.house,
    id: Math.random().toString(),
    houseHoldCode: Math.floor(Math.random() * 90000) + 10000,
  };
  dispatch(createOwner({ ...createData.member, householdId: household.id }));
  return household;
});

export const editHouseHold = createAsyncThunk<
  ICreateHouseHold, 
  ICreateHouseHold,
  ThunkApi
>("household/editHouseHold", async (updateData) => {  
  const household: ICreateHouseHold = {
    ...updateData,  
    name: updateData.name    
  };  
  return household;
});
