import { IAvatar } from "../../interfaces/IAvatar";
import { IMember } from "../../interfaces/IMember";

export interface MemberState {
  members: IMember[];
  householdMembers: IMember[];
  availableHouseholdMemberAvatars: IAvatar[];
  loading: boolean;
  error: string;
}

export const initialState: MemberState = {
  members: [],
  householdMembers: [],
  availableHouseholdMemberAvatars: [],
  loading: false,
  error: "",
};
