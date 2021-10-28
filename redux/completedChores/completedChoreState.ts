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
      id: "1",
      choreId: "1",
      memberId: "4",
      houseHoldId: "3",
      completed: "2021-10-10T22:00:00.000Z",
      weight: 2,
    },
    {
      id: "2",
      choreId: "1",
      memberId: "5",
      houseHoldId: "3",
      completed: "2021-10-12T22:00:00.000Z",
      weight: 2,
    },
    {
      id: "3",
      choreId: "1",
      memberId: "5",
      houseHoldId: "3",
      completed: "2021-10-15T22:00:00.000Z",
      weight: 2,
    },
    {
      id: "4",
      choreId: "1",
      memberId: "4",
      houseHoldId: "3",
      completed: "2021-10-20T22:00:00.000Z",
      weight: 2,
    },
  ],
  loading: false,
  error: "",
  isCreatedSuccess: true,
};
