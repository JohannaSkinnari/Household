import { createAsyncThunk } from "@reduxjs/toolkit";
import Firebase from "../../database/config";
import { ICreateHouseHold, IHouseHold } from "../../interfaces/IHouseHold";
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

export const findHouseHoldCode = createAsyncThunk<number, number, ThunkApi>(
  "household/findHouseHoldCode",
  async data => {
    const code = await Firebase.firestore()
      .collection("/household")
      .where("houseHoldCode", "==", data)
      .get();

    return Number(code);
  }
);

// export const findHouseHoldCode = createAsyncThunk<IHouseHold, number, ThunkApi>(
//   "household/findHouseHoldCode",
//   async data => {
//     const householdData = await (
//       await Firebase.firestore()
//         .collection("/household")
//         .where("houseHoldCode", "==", data)
//         .get()
//     ).docs.map(doc => ({ id: doc.id, ...doc.data() } as IHouseHold));

//     const household = householdData.find(
//       h => h.houseHoldCode == data
//     ) as IHouseHold;

//     return household;
//   }
// );
