import firebase from "firebase";

export type IUser = Pick<firebase.User, "displayName" | "uid"> | null;
