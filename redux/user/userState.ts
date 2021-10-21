import { IUser } from "../../interfaces/IUser";

export interface UserState {
  user: IUser;
  loading: boolean;
  error: string;
}

export const initialState: UserState = {
  user: {
    id: "1",
    name: "mrfejk",
    email: "egc@fogjs.com",
    password: "password",
  },

  loading: false,
  error: "",
};
