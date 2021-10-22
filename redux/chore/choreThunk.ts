import { createAsyncThunk } from "@reduxjs/toolkit";
import { IChore, ICreateChore } from "../../interfaces/IChore";
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


type ThunkParam = ICreateChore;

export const createChore = createAsyncThunk<
  IChore,
  ThunkParam,
  ThunkApi
>("chore/createChore", async (createData, { dispatch }) => {
  // servern ska lösa det här istället.
  const chore: IChore = {
    ...createData,
    id: Math.random().toString(),
  };
  // dispatch(createMember({ ...createData.member, householdId: household.id }));
  console.log("thunk: " +chore);
  
  return chore;
});
