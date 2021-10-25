export interface ICompletedChore {
  id: string;
  choreId: string;
  userId: string;
  houseHoldId: string;
  // completed: Date;
  completed: string;
  weight: number;
}

export type ICreateCompletedChore = Omit<ICompletedChore, "id">;
