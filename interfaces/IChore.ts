export interface IChore {
  id: string;
  name: string;
  householdId: number;
  description: string;
  interval: number;
  weight: number;
  lastCompleted?: Date;
}
