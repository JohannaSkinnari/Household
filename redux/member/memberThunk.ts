import { createAsyncThunk } from "@reduxjs/toolkit";
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
    };
    return member;
  }
);

export const createOwner = createAsyncThunk<IMember, ICreateMember, ThunkApi>(
  "member/createOwner",
  async (createMember, { getState }) => {
    const state = getState();
    const member: IMember = {
      ...createMember,
      id: Math.random().toString(),
      userId: state.userList.activeUser?.uid as string,
      name: state.userList.activeUser?.displayName as string,
      isAdmin: true,
    };
    return member;
  }
);
