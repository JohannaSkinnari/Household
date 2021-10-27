export interface IChore {
  id: string;
  name: string;
  householdId: string;
  description: string;
  interval: number;
  weight: number;
  lastCompleted?: string;
  isArchived?: boolean;
}

export type IModefideChore = Omit<IChore, "id">;
