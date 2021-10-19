import { IChore } from "../../interfaces/IChore";

export interface ChoresState {
  chores: IChore[];
  loading: boolean;
  error: string;
}

export const initialState: ChoresState = {
  chores: [],
  loading: false,
  error: "",
};
