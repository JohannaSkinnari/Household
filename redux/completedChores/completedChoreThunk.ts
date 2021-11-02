import { createAsyncThunk } from "@reduxjs/toolkit";
import Firebase from "../../database/config";
import { IChore } from "../../interfaces/IChore";
import { ICompletedChore } from "../../interfaces/ICompletedChore";
import { ThunkApi } from "../reduxStore";

type ThunkParam = IChore;

export const createCompletedChore = createAsyncThunk<
  ICompletedChore,
  ThunkParam,
  ThunkApi
>("chore/createCompletedChore", async (createData, { getState }) => {
  const state = getState();
  const completedChore: ICompletedChore = {
    id: "",
    choreId: createData.id,
    memberId: state.userList.activeUser?.uid as string,
    householdId: createData.householdId,
    completed: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ).toString(),
    weight: createData.weight,
  };

  await Firebase.firestore()
    .collection("/completedChore")
    .add(completedChore)
    .then(docRef => {
      Firebase.firestore()
        .collection("/completedChore")
        .doc(docRef.id)
        .update({ id: docRef.id });
      completedChore.id = docRef.id;
    });
  return completedChore;
});

export const deleteCompletedChore = createAsyncThunk<string, string, ThunkApi>(
  "chore/deleteCompletedChore",
  async choreId => {
    await Firebase.firestore()
      .collection("/completedChore")
      .where("choreId", "==", choreId)
      .get()
      .then(querySnapshot => {
        const batch = Firebase.firestore().batch();
        querySnapshot.forEach(doc => {
          batch.delete(doc.ref);
        });
        return batch.commit();
      });
    return choreId;
  }
);
