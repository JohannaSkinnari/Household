import { IChore } from "../../interfaces/IChore";

export interface ChoresState {
  chores: IChore[];
  loading: boolean;
  error?: string;
  isCreatedSuccess: boolean;
}

export const initialState: ChoresState = {
  chores: [],
  loading: false,
  isCreatedSuccess: true,
};
