import { IChore } from "./IChore";
import { ICompletedChore } from "./ICompletedChore";
import { IMember } from "./IMember";

export interface HouseHold {
  id: number;
  name: string;
  members: Array<IMember>;
  chores: Array<IChore>;
  completedChores: Array<ICompletedChore>;
}
