export interface ICompletedChore {
  id: string;
  choreId: string;
  memberId: string;
  houseHoldId: string;
  completed: string;
  weight: number;
}

export type ICreateCompletedChore = Omit<ICompletedChore, "id">;
