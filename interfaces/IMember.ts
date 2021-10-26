export interface IMember {
  userId: string;
  householdId: string;
  isAdmin: boolean;
  avatarId: number;
}

export type ICreateMember = Omit<IMember, "id" | "userId" | "isAdmin">;
