import { createAsyncThunk } from "@reduxjs/toolkit";
import Firebase from "../../database/config";
import { ICreateMember, IMember } from "../../interfaces/IMember";
import { ThunkApi } from "../reduxStore";

export const createMember = createAsyncThunk<IMember, ICreateMember, ThunkApi>(
  "member/createMember",
  async (createMember, { getState }) => {
    const state = getState();
    const member: IMember = {
      ...createMember,
      id: Math.random().toString(),
      userId: state.userList.activeUser?.uid as string,
      name: state.userList.activeUser?.displayName as string,
      isAdmin: false,
      isApproved: false,
    };
    await Firebase.firestore()
      .collection("/member")
      .doc(state.userList.activeUser?.uid)
      .set(member);
    return member;
  }
);

export const createOwner = createAsyncThunk<IMember, ICreateMember, ThunkApi>(
  "member/createOwner",
  async (createMember, { getState }) => {
    const state = getState();
    const member: IMember = {
      ...createMember,
      id: "",
      userId: state.userList.activeUser?.uid as string,
      name: state.userList.activeUser?.displayName as string,
      isAdmin: true,
      isApproved: true,
    };
    await Firebase.firestore()
      .collection("/member")
      .add(member)
      .then((docRef) => {
        Firebase.firestore()
          .collection("/member")
          .doc(docRef.id)
          .update({ id: docRef.id });
        member.id = docRef.id;
      });
    return member;
  }
);
