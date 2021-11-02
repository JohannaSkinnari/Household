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
      choreId: "3",
      memberId: "1",
      houseHoldId: "3",
      completed: "2021-10-21T22:00:00.000Z",
      weight: 1,
    },
    {
      id: "2",
      choreId: "3",
      memberId: "1",
      houseHoldId: "3",
      completed: "2021-10-22T22:00:00.000Z",
      weight: 1,
    },
    {
      id: "3",
      choreId: "3",
      memberId: "1",
      houseHoldId: "3",
      completed: "2021-10-23T22:00:00.000Z",
      weight: 1,
    },
    {
      id: "4",
      choreId: "3",
      memberId: "2",
      houseHoldId: "3",
      completed: "2021-10-24T22:00:00.000Z",
      weight: 1,
    },
    {
      id: "5",
      choreId: "3",
      memberId: "2",
      houseHoldId: "3",
      completed: "2021-10-06T22:00:00.000Z",
      weight: 1,
    },
    {
      id: "6",
      choreId: "2",
      memberId: "1",
      houseHoldId: "3",
      completed: "2021-10-21T22:00:00.000Z",
      weight: 1,
    },
    {
      id: "7",
      choreId: "2",
      memberId: "2",
      houseHoldId: "3",
      completed: "2021-10-21T22:00:00.000Z",
      weight: 1,
    },
    {
      id: "8",
      choreId: "7",
      memberId: "1",
      houseHoldId: "3",
      completed: "2021-10-21T22:00:00.000Z",
      weight: 1,
    },
  ],
  // completedChores: [],
  loading: false,
  error: "",
  isCreatedSuccess: true,
};
