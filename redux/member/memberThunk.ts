import { createAsyncThunk } from "@reduxjs/toolkit";
import { avatars } from "../../assets/AvatarData/data";
import Firebase from "../../database/config";
import { IAvatar } from "../../interfaces/IAvatar";
import { ICreateMember, IMember } from "../../interfaces/IMember";
import { ThunkApi } from "../reduxStore";

export const createMember = createAsyncThunk<IMember, ICreateMember, ThunkApi>(
  "member/createMember",
  async (createMemberData, { getState }) => {
    const state = getState();
    const member: IMember = {
      ...createMemberData,
      id: "",
      userId: state.userList.activeUser?.uid as string,
      name: state.userList.activeUser?.displayName as string,
      isAdmin: false,
      isApproved: false,
      isActive: true,
    };
    await Firebase.firestore()
      .collection("/member")
      .add(member)
      .then(docRef => {
        Firebase.firestore()
          .collection("/member")
          .doc(docRef.id)
          .update({ id: docRef.id });
        member.id = docRef.id;
      });
    return member;
  }
);

export const createOwner = createAsyncThunk<IMember, ICreateMember, ThunkApi>(
  "member/createOwner",
  async (createOwnerData, { getState }) => {
    const state = getState();
    const member: IMember = {
      ...createOwnerData,
      id: "",
      userId: state.userList.activeUser?.uid as string,
      name: state.userList.activeUser?.displayName as string,
      isAdmin: true,
      isApproved: true,
      isActive: true,
    };
    await Firebase.firestore()
      .collection("/member")
      .add(member)
      .then(docRef => {
        Firebase.firestore()
          .collection("/member")
          .doc(docRef.id)
          .update({ id: docRef.id });
        member.id = docRef.id;
      });
    return member;
  }
);

export const getAvailableAvatars = createAsyncThunk<
  IAvatar[],
  string,
  ThunkApi
>("member/getMembers", async data => {
  const members = (
    await Firebase.firestore()
      .collection("/member")
      .where("householdId", "==", data)
      .get()
  ).docs.map(doc => ({ id: doc.id, ...doc.data() } as IMember));

  const availableAvatars = avatars.filter(
    avatar => !members.some(member => avatar.id === member.avatarId)
  );

  return availableAvatars;
});
export const pauseMember = createAsyncThunk<IMember, IMember, ThunkApi>(
  "member/pauseMember",
  async memberToPause => {
    const member: IMember = {
      ...memberToPause,
      isActive: false,
    };
    await Firebase.firestore().collection("/member").doc(member.id).update({
      isActive: member.isActive,
    });

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
    await Firebase.firestore().collection("/member").doc(member.id).update({
      isActive: member.isActive,
    });
    return member;
  }
);

export const acceptMember = createAsyncThunk<IMember, IMember, ThunkApi>(
  "member/acceptMember",
  async memberToAccept => {
    const member: IMember = {
      ...memberToAccept,
      isApproved: true,
    };
    await Firebase.firestore().collection("/member").doc(member.id).update({
      isApproved: member.isApproved,
    });

    return member;
  }
);

export const rejectMember = createAsyncThunk<string, IMember, ThunkApi>(
  "member/rejectMember",
  async memberToReject => {
    await Firebase.firestore()
      .collection("/member")
      .doc(memberToReject.id)
      .delete();
    return memberToReject.id;
  }
);
export const deleteHouseHoldMember = createAsyncThunk<string, string, ThunkApi>(
  "member/deleteHouseHoldMember",
  async memberId => {
    await Firebase.firestore().collection("/member").doc(memberId).delete();

    return memberId;
  }
);
