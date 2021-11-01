import { IMember } from "../../interfaces/IMember";

export interface MemberState {
  members: IMember[];
  loading: boolean;
  isCreatedSuccess: boolean;
  error: string;
}

export const initialState: MemberState = {
  members: [
    {
      id: "1",
      userId: "2",
      householdId: "1",
      isAdmin: true,
      isActive: true,
      avatarId: 1,
    },
    {
      id: "2",
      userId: "1",
      householdId: "2",
      isAdmin: false,
      isActive: true,
      avatarId: 3,
    },
    {
      id: "4",
      userId: "1",
      householdId: "3",
      isAdmin: true,
      isActive: true,
      avatarId: 4,
    },
    {
      id: "5",
      userId: "2",
      householdId: "3",
      isAdmin: false,
      isActive: false,
      avatarId: 1,
    },
    {
      id: "6",
      userId: "1",
      householdId: "1",
      isAdmin: false,
      isActive: true,
      avatarId: 8,
    },
    {
      id: "7",
      userId: "2",
      householdId: "2",
      isAdmin: false,
      isActive: true,
      avatarId: 1,
    },
  ],
  loading: false,
  isCreatedSuccess: true,
  error: "",
};
