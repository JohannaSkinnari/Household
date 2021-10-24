import { createAsyncThunk } from "@reduxjs/toolkit";
import { IChore, IModefideChore } from "../../interfaces/IChore";
import { useAppSelector } from "../reduxHooks";
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
  async (createData) => {
    // servern ska lösa det här istället.
    const chore: IChore = {
      ...createData,
      id: Math.random().toString(),
    };
    // prata med API
    return chore;
  }
);

export const editChore = createAsyncThunk<IChore, ThunkParam, ThunkApi>(
  "chore/editChore",
  async (updateData) => {
    console.log("edit thunk");
    // prata med API
    return updateData;
  }
);
