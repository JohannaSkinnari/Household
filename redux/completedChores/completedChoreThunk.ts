import { createAsyncThunk } from "@reduxjs/toolkit";
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
  // servern ska lösa id istället.
  const completedChore: ICompletedChore = {
    id: Math.random().toString(),
    choreId: createData.id,
    userId: state.userList.activeUser.id,
    houseHoldId: createData.householdId,
    completed: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ).toDateString(),
    weight: createData.weight,
  };
  // prata med API

  return completedChore;
});

export const deleteCompletedChore = createAsyncThunk<string, string, ThunkApi>(
  "chore/deleteCompletedChore",
  async choreId =>
    // prata med API
    choreId
);
