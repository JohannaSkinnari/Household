export interface IMember {
  id: string;
  userId: string;
  householdId: string;
  isAdmin: boolean;
  isActive: boolean;
  avatarId: number;
}

export type ICreateMember = Omit<
  IMember,
  "id" | "userId" | "isAdmin" | "isActive"
>;
