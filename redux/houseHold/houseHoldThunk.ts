import { createAsyncThunk } from "@reduxjs/toolkit";
import { firestore } from "../../database/firebase";
import { ICreateHouseHold, IHouseHold } from "../../interfaces/IHouseHold";
import { ICreateMember } from "../../interfaces/IMember";
import { createOwner } from "../member/memberThunk";
import { ThunkApi } from "../reduxStore";
import { v4 as uuid } from 'uuid';

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

  const uid: string = uuid();
  const household: IHouseHold = {
    ...createData.house,
    houseHoldCode: Math.floor(Math.random() * 90000) + 10000,
    id: uid,
  };
  const db = firestore;
    db.collection('household').doc(household.id).set({...createData.house,
      houseHoldCode: Math.floor(Math.random() * 90000) + 10000,})
      db.collection('householdsOwner').doc(household.id).set({...createData.member, householdId: household.id})

  dispatch(createOwner({ ...createData.member, householdId: household.id }));
  return household;
});
