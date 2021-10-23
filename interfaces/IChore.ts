export interface IChore {
  id: string;
  name: string;
  householdId: string;
  description: string;
  interval: number;
  weight: number;
  lastCompleted?: Date;
}
export type IModefideChore = Omit<IChore, "id">;
