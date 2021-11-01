import { IMember } from "../../interfaces/IMember";

export interface MemberState {
  members: IMember[];
  loading: boolean;
  error: string;
}

export const initialState: MemberState = {
  members: [
    {
      id: "1",
      userId: "2",
      householdId: "1",
      isAdmin: true,
      avatarId: 1,
    },
    {
      id: "2",
      userId: "1",
      householdId: "2",
      isAdmin: false,
      avatarId: 3,
    },
    {
      id: "4",
      userId: "1",
      householdId: "3",
      isAdmin: true,
      avatarId: 4,
    },
    {
      id: "5",
      userId: "2",
      householdId: "3",
      isAdmin: false,
      avatarId: 1,
    },
    {
      id: "6",
      userId: "1",
      householdId: "1",
      isAdmin: false,
      avatarId: 8,
    },
    {
      id: "7",
      userId: "2",
      householdId: "2",
      isAdmin: false,
      avatarId: 1,
    },
  ],
  loading: false,
  error: "",
};
