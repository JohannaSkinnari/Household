import { ICompletedChore } from "../../interfaces/ICompletedChore";

export interface completedChoreState {
  completed: ICompletedChore[];
  loading: boolean;
  error: string;
}

export const initialState: completedChoreState = {
  completed: [],
  loading: false,
  error: "",
};
