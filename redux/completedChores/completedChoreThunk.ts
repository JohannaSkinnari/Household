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
  const completedChore: ICompletedChore = {
    id: Math.random().toString(),
    choreId: createData.id,
    memberId: state.userList.activeUser?.uid as string, // state.userList.activeUser.id borde vara något i stil med state.memberList.activeMember
    houseHoldId: createData.householdId,
    completed: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ).toString(),
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
