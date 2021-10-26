import { IUser } from "../../interfaces/IUser";

export interface UserState {
  activeUser: IUser | null;
  // users: IUser[];
  loading: boolean;
  error: string;
}

export const initialState: UserState = {
  activeUser: null,
  // users: [
  //   {
  //     id: "1",
  //     name: "tjillevippen",
  //     email: "egc@fogjs.com",
  //   },
  //   {
  //     id: "2",
  //     name: "Jo'Anne",
  //     email: "egc@fogjs.com",
  //   },
  // ],
  loading: false,
  error: "",
};
