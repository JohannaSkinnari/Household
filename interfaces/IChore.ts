export interface IChore {
  id: string;
  name: string;
  householdId: string;
  description: string;
  interval: number;
  weight: number;
  lastCompleted?: string;
}
export type IModefideChore = Omit<IChore, "id">;
