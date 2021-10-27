import { ICompletedChore } from "../../interfaces/ICompletedChore";

export interface completedChoreState {
  completedChores: ICompletedChore[];
  loading: boolean;
  error: string;
  isCreatedSuccess: boolean;
}

export const initialState: completedChoreState = {
  completedChores: [
    {
      id: "",
      choreId: "",
      memberId: "",
      houseHoldId: "",
      completed: "",
      weight: 0,
    },
  ],
  loading: false,
  error: "",
  isCreatedSuccess: true,
};
