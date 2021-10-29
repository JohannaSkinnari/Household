import { createAsyncThunk } from "@reduxjs/toolkit";
import Firebase from "../../database/config";
import { IChore } from "../../interfaces/IChore";
import { ICompletedChore } from "../../interfaces/ICompletedChore";
import { IHouseHold } from "../../interfaces/IHouseHold";
import { IMember } from "../../interfaces/IMember";
import { IUser } from "../../interfaces/IUser";
import { ThunkApi } from "../reduxStore";

type AppDataPayload = {
  members: IMember[];
  houseHoldMembers: IMember[];
  households: IHouseHold[];
  otherHouseholds: IHouseHold[];
  chores: IChore[];
  completedChores: ICompletedChore[];
};

export const loadData = createAsyncThunk<AppDataPayload, IUser, ThunkApi>(
  "auth/loadData",
  async (user, { rejectWithValue }) => {
    if (!user) {
      return rejectWithValue("bip bop");
    }
    // hämta alla egna members och även members i hushållen
    const myMembers = (
      await Firebase.firestore()
        .collection("/member")
        .where("userId", "==", user.uid)
        .get()
    ).docs.map(doc => ({ id: doc.id, ...doc.data() } as IMember));

    // hämta alla hushåll som användaren tillhör.
    const householdIds = myMembers.map(member => member.householdId);

    const households = householdIds.length
      ? (
          await Firebase.firestore()
            .collection("/household")
            .where("id", "in", householdIds)
            .get()
        ).docs.map(doc => ({ id: doc.id, ...doc.data() } as IHouseHold))
      : [];
    console.log(households);
    // de andra hushållen
    const otherHouseholds = (
      await Firebase.firestore()
        .collection("/household")
        .where("id", "not-in", householdIds)
        .get()
    ).docs.map(doc => ({ id: doc.id, ...doc.data() } as IHouseHold));
    console.log(otherHouseholds);
    const houseId = households.map(h => h.id);

    const houseHoldMembers = (
      await Firebase.firestore()
        .collection("/member")
        .where("householdId", "in", houseId)
        .get()
    ).docs.map(doc => ({ id: doc.id, ...doc.data() } as IMember));

    // // hämta alla chores för hushållen
    // const chores = (await Firebase.firestore().collection("/chores").get())
    //   .docs as unknown as IChore[];
    // // hämta completed chores
    // const completedChores = (
    //   await Firebase.firestore().collection("/completedChore").get()
    // ).docs as unknown as ICompletedChore[];

    return {
      members: myMembers,
      houseHoldMembers,
      households,
      otherHouseholds,
      chores: [],
      completedChores: [],
    };
  }
);
