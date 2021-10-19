export interface ICompletedChore {
  id: string;
  choreId: string;
  userId: string;
  houseHoldId: string;
  completed: Date;
  weight: number;
}
