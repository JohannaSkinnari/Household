import { IMember } from "../../interfaces/IMember";

export interface MemberState {
  members: IMember[];
  loading: boolean;
  error: string;
}

export const initialState: MemberState = {
  members: [],
  loading: false,
  error: "",
};
