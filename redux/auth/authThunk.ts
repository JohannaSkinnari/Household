import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase";
import Firebase from "../../database/config";
import { IChore } from "../../interfaces/IChore";
import { ICompletedChore } from "../../interfaces/ICompletedChore";
import { IHouseHold } from "../../interfaces/IHouseHold";
import { IMember } from "../../interfaces/IMember";
import { ISignUpData } from "../../interfaces/ISignupData";
import { IUser } from "../../interfaces/IUser";
import { ThunkApi } from "../reduxStore";

type AppDataPayload = {
  members: IMember[];
  households: IHouseHold[];
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
    const members = (
      await Firebase.firestore()
        .collection("/member")
        .where("userId", "==", user.uid)
        .get()
    ).docs.map((doc) => ({ id: doc.id, ...doc.data() } as IMember));
    //   .then((snapshot) => {
    //     snapshot.docs.forEach((doc) => {
    //       console.log(doc.id, doc.data());
    //     });
    //   })) as any as IMember[];
    // hämta alla hushåll som användaren tillhör.
    const households = (
      await Firebase.firestore()
        .collection("/household")
        // .where("userId", "==", user.uid)
        .get()
    ).docs.map((doc) => ({ id: doc.id, ...doc.data() } as IHouseHold));
    // const households = (
    //   await Firebase.firestore().collection("/household").get()
    // ).docs as unknown as IHouseHold[];
    // // hämta alla chores för hushållen
    // const chores = (await Firebase.firestore().collection("/chores").get())
    //   .docs as unknown as IChore[];
    // // hämta completed chores
    // const completedChores = (
    //   await Firebase.firestore().collection("/completedChore").get()
    // ).docs as unknown as ICompletedChore[];

    return { members, households, chores: [], completedChores: [] };
  }
);
