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
      userId: state.userList.user.id,
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
      userId: state.userList.user.id,
      isAdmin: true,
    };
    return member;
  }
);
