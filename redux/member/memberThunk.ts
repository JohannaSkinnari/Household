import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICreateMember, IMember } from "../../interfaces/IMember";
import { ThunkApi } from "../reduxStore";

export const createMember = createAsyncThunk<IMember, ICreateMember, ThunkApi>(
  "member/createMember",
  async (createMemberData, { getState }) => {
    const state = getState();
    const member: IMember = {
      ...createMemberData,
      id: Math.random().toString(),
      userId: state.userList.activeUser.id,
      isAdmin: false,
    };
    return member;
  }
);

export const createOwner = createAsyncThunk<IMember, ICreateMember, ThunkApi>(
  "member/createOwner",
  async (createOwnerData, { getState }) => {
    const state = getState();
    const member: IMember = {
      ...createOwnerData,
      id: Math.random().toString(),
      userId: state.userList.activeUser.id,
      isAdmin: true,
    };
    return member;
  }
);
