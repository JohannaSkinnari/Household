import { IUser } from "../../interfaces/IUser";

export interface UserState {
  activeUser: IUser | null;
  loading: boolean;
  error: string;
}

export const initialState: UserState = {
  activeUser: null,
  loading: false,
  error: "",
};
