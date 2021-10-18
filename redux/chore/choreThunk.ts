import { createAsyncThunk } from "@reduxjs/toolkit";
import { IChore } from "../../interfaces/IChore";

export const getChores = createAsyncThunk<IChore[]>(
  "chores/getChores",
  async () => {
    const response = await fetch("https://ourfirebaseurl.com/chores");
    if (response.status !== 200) {
    }
    const data: IChore[] = await response.json();
    return data;
  }
);
