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
      userId: "4",
      name: "test",
      householdId: "1",
      isAdmin: true,
      isApproved: true,
      avatarId: 1,
    },
    {
      id: "2",
      userId: "1",
      name: "jepp",
      householdId: "2",
      isAdmin: false,
      isApproved: true,
      avatarId: 3,
    },
    {
      id: "4",
      userId: "1",
      name: "test",
      householdId: "3",
      isAdmin: true,
      isApproved: true,
      avatarId: 4,
    },
    {
      id: "5",
      userId: "2",
      name: "test",
      householdId: "3",
      isAdmin: false,
      isApproved: false,
      avatarId: 1,
    },
    {
      id: "6",
      userId: "1",
      name: "test",
      householdId: "1",
      isAdmin: false,
      isApproved: true,
      avatarId: 8,
    },
  ],
  loading: false,
  error: "",
};
