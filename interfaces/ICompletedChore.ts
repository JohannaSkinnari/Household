export interface ICompletedChore {
  id: string;
  choreId: string;
  userId: string;
  houseHoldId: string;
  completed: string;
  weight: number;
}

export type ICreateCompletedChore = Omit<ICompletedChore, "id">;
