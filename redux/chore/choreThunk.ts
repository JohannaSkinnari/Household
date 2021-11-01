import { createAsyncThunk } from "@reduxjs/toolkit";
import Firebase from "../../database/config";
import { IChore } from "../../interfaces/IChore";
import {
  createCompletedChore,
  deleteCompletedChore,
} from "../completedChores/completedChoreThunk";
import { ThunkApi } from "../reduxStore";
// useEffect för huvudsida kanske ?  i samband med att du loggar in sig. Som en usedatafetcher custom hook => datafetcher useEffecter kör dessa functioner.
export const getChores = createAsyncThunk<IChore[]>(
  "chores/getChores",
  async () => {
    const response = await fetch("https://ourfirebaseurl.com/chores");
    if (!response.ok) {
      throw new Error("bip bop bop");
    }
    const data: IChore[] = await response.json();
    return data;
  }
);

type ThunkParam = IChore;

export const createChore = createAsyncThunk<IChore, ThunkParam, ThunkApi>(
  "chore/createChore",
  async createData => {
    // servern ska lösa det här istället.
    const chore: IChore = {
      ...createData,
      id: "",
    };
    await Firebase.firestore()
      .collection("/chore")
      .add(chore)
      .then(docRef => {
        Firebase.firestore()
          .collection("/chore")
          .doc(docRef.id)
          .update({ id: docRef.id });
        chore.id = docRef.id;
      });
    return chore;
  }
);

export const editChore = createAsyncThunk<IChore, ThunkParam, ThunkApi>(
  "chore/editChore",
  async updateData => {
    const updatedChore: IChore = {
      ...updateData,
    };
    await Firebase.firestore().collection("/chore").doc(updateData.id).update({
      description: updatedChore.description,
      interval: updatedChore.interval,
      isArchived: updatedChore.isArchived,
      name: updatedChore.name,
      weight: updatedChore.weight,
    });

    return updatedChore;
  }
);

export const archiveChore = createAsyncThunk<IChore, ThunkParam, ThunkApi>(
  "chore/archiveChore",
  async updateData => {
    const archivedChore: IChore = {
      ...updateData,
      isArchived: true,
    };
    await Firebase.firestore()
      .collection("/chore")
      .doc(updateData.id)
      .update({ isArchived: archivedChore.isArchived });
    return archivedChore;
  }
);

export const completeChore = createAsyncThunk<IChore, ThunkParam, ThunkApi>(
  "chore/completeChore",
  async (updateData, { dispatch }) => {
    const updatedChore: IChore = {
      ...updateData,
      lastCompleted: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ).toString(),
    };

    await Firebase.firestore()
      .collection("/chore")
      .doc(updateData.id)
      .update({ lastCompleted: updatedChore.lastCompleted });

    await dispatch(createCompletedChore(updatedChore));
    return updatedChore;
  }
);

export const deleteChore = createAsyncThunk<string, string, ThunkApi>(
  "chore/deleteChore",
  async (choreId, { dispatch }) => {
    await Firebase.firestore().collection("/chore").doc(choreId).delete();
    await dispatch(deleteCompletedChore(choreId));
    return choreId;
  }
);
