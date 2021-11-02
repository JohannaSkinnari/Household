import { IAvatar } from "../../interfaces/IAvatar";
import { IMember } from "../../interfaces/IMember";

export interface MemberState {
  members: IMember[];
  householdMembers: IMember[];
  availableHouseholdMemberAvatars: IAvatar[];
  loading: boolean;
  isCreatedSuccess: boolean;
  error: string;
}

export const initialState: MemberState = {
  members: [],
  householdMembers: [],
  availableHouseholdMemberAvatars: [],
  loading: false,
  isCreatedSuccess: true,
  error: "",
};
