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
  chores: IChore[];
  completedChores: ICompletedChore[];
};

export const loadBackgroundData = createAsyncThunk<
  IHouseHold[],
  IUser,
  ThunkApi
>("auth/loadBackgroundData", async (user, { rejectWithValue }) => {
  if (!user) {
    rejectWithValue("Rejected,no user");
  }
  const households = (
    await Firebase.firestore().collection("/household").get()
  ).docs.map(doc => ({ id: doc.id, ...doc.data() } as IHouseHold));

  return households;
});

export const loadData = createAsyncThunk<AppDataPayload, IUser, ThunkApi>(
  "auth/loadData",
  async (user, { rejectWithValue }) => {
    if (!user) {
      return rejectWithValue("bip bop");
    }

    // Get all own members and all members of household
    const myMembers = (
      await Firebase.firestore()
        .collection("/member")
        .where("userId", "==", user.uid)
        .get()
    ).docs.map(doc => ({ id: doc.id, ...doc.data() } as IMember));

    const members = myMembers.filter(m => m.isApproved === true);

    // get all household where user has membership
    const householdIds = members.map(member => member.householdId);

    const households = householdIds.length
      ? (
          await Firebase.firestore()
            .collection("/household")
            .where("id", "in", householdIds)
            .get()
        ).docs.map(doc => ({ id: doc.id, ...doc.data() } as IHouseHold))
      : [];

    const houseId = households.map(h => h.id);

    const houseHoldMembers = (
      await Firebase.firestore()
        .collection("/member")
        .where("householdId", "in", houseId)
        .get()
    ).docs.map(doc => ({ id: doc.id, ...doc.data() } as IMember));

    // Get all chores for households
    const chores = (
      await Firebase.firestore()
        .collection("/chore")
        .where("householdId", "in", householdIds)
        .get()
    ).docs.map(doc => ({ id: doc.id, ...doc.data() } as IChore));

    // Get all completedChores
    const completedChores = (
      await Firebase.firestore()
        .collection("/completedChore")
        .where("householdId", "in", householdIds)
        .get()
    ).docs.map(doc => ({ id: doc.id, ...doc.data() } as ICompletedChore));
    return {
      members: myMembers,
      houseHoldMembers,
      households,
      chores,
      completedChores,
    };
  }
);
