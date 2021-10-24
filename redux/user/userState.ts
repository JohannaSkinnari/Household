import { IUser } from "../../interfaces/IUser";

export interface UserState {
  users: IUser[];
  loading: boolean;
  error: string;
}

export const initialState: UserState = {
  users: [
    {
      id: "1",
      name: "mrfejk",
      email: "egc@fogjs.com",
      password: "password",
    },
    {
      id: "2",
      name: "ladyfejk",
      email: "egc@fogjs.com",
      password: "password",
    },
  ],
  loading: false,
  error: "",
};
