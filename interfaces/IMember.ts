export interface IMember {
  id: string;
  userId: string;
  name: string;
  householdId: string;
  isAdmin: boolean;
  avatarId: number;
}

export type ICreateMember = Omit<IMember, "id" | "userId" | "isAdmin" | "name">;
