export interface IMember {
  id: string;
  userId: string;
  name: string;
  householdId: string;
  isAdmin: boolean;
  isApproved: boolean;
  isActive: boolean;
  avatarId: number;
}

export type ICreateMember = Omit<
  IMember,
  "id" | "userId" | "isAdmin" | "name" | "isApproved" | "isActive"
>;
