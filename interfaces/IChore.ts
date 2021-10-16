export interface IChore {
  id: string;
  name: string;
  description: string;
  interval: number;
  weight: number;
  lastCompleted: Date;
}
