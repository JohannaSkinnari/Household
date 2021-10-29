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
      isActive: true,
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
      isActive: true,
    };
    return member;
  }
);

export const pauseMember = createAsyncThunk<IMember, IMember, ThunkApi>(
  "member/pauseMember",
  async memberToPause => {
    const member: IMember = {
      ...memberToPause,
      isActive: false,
    };
    // prata med API
    console.log("pausethunk");

    return member;
  }
);

export const activateMember = createAsyncThunk<IMember, IMember, ThunkApi>(
  "member/activateMember",
  async memberToActivate => {
    const member: IMember = {
      ...memberToActivate,
      isActive: true,
    };
    console.log("activethunk");
    // prata med API
    return member;
  }
);
