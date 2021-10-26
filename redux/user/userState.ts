import { IUser } from "../../interfaces/IUser";

export interface UserState {
  activeUser: IUser;
  users: IUser[];
  loading: boolean;
  error: string;
}

export const initialState: UserState = {
  activeUser: {
    id: "1",
    name: "alfos",
    email: "egc@fogjs.com",
    password: "password",
  },
  users: [
    {
      id: "1",
      name: "tjillevippen",
      email: "egc@fogjs.com",
      password: "password",
    },
    {
      id: "2",
      name: "Jo'Anne",
      email: "egc@fogjs.com",
      password: "password",
    },
  ],
  loading: false,
  error: "",
};
