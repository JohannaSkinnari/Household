import { IMember } from "../../interfaces/IMember";

export interface MemberState {
  members: IMember[];
  householdMembers: IMember[];
  loading: boolean;
  error: string;
}

export const initialState: MemberState = {
  members: [],
  householdMembers: [],
  loading: false,
  error: "",
};
