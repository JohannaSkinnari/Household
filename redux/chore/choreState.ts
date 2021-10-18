import { IChore } from "../../interfaces/IChore";

export interface ChoresState {
  chores: IChore[];
  loading: boolean;
  error: boolean;
}

export const initialState: ChoresState = {
  chores: [],
  loading: false,
  error: false,
};
