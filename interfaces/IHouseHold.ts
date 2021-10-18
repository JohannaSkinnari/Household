import { IChore } from "./IChore";
import { ICompletedChore } from "./ICompletedChore";
import { IMember } from "./IMember";

export interface IHouseHold {
  id: number;
  name: string;
  houseHoldCode: number;
  members: Array<IMember>;
  chores: Array<IChore>;
  completedChores: Array<ICompletedChore>;
}
