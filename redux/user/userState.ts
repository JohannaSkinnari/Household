import { IUser } from "../../interfaces/IUser";

export interface UserState {
  users: IUser[];
  loading: boolean;
  error: string;
}

export const initialState: UserState = {
  users: [],
  loading: false,
  error: "",
};
