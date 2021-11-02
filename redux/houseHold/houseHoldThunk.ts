import { createAsyncThunk } from "@reduxjs/toolkit";
import Firebase from "../../database/config";
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
  const household: IHouseHold = {
    ...createData.house,
    id: "",
    houseHoldCode: Math.floor(Math.random() * 90000) + 10000,
  };
  await Firebase.firestore()
    .collection("/household")
    .add(household)
    .then(docRef => {
      Firebase.firestore()
        .collection("/household")
        .doc(docRef.id)
        .update({ id: docRef.id });
      household.id = docRef.id;
      dispatch(createOwner({ ...createData.member, householdId: docRef.id }));
    });
  return household;
});

export const editHouseHold = createAsyncThunk<
  IEditHouseHold, 
  IEditHouseHold,
  ThunkApi
>("household/editHouseHold", async (updateData) => {  
  const household: IEditHouseHold = {
    ...updateData,  
      
  };
  await Firebase.firestore()
  .collection("/household")
  .doc(updateData.id).update({    
    id: updateData.id ,
    name: updateData.name,
  })
  return household;
});
