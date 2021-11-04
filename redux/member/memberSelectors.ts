import { avatars } from "../../assets/AvatarData/data";
import { RootState } from "../reduxStore";

export const selectAllMembers = (state: RootState) => state.memberList.members;

export const selectMembersByHouseholdId =
  (householdId: string) => (state: RootState) =>
    state.memberList.householdMembers
      .filter(m => m.householdId == householdId && m.isApproved === true)
      .map(member => ({
        member,
        avatar: avatars.find(avatar => avatar.id == member.avatarId),
      }));
export const selectMembersByHouseholdIdAndActiveStatus =
  (householdId: string) => (state: RootState) =>
    state.memberList.householdMembers
      .filter(
        m =>
          m.householdId == householdId &&
          m.isApproved === true &&
          m.isActive === true
      )
      .map(member => ({
        member,
        avatar: avatars.find(avatar => avatar.id == member.avatarId),
      }));

export const selectOwnerOfHousehold =
  (householdId: string) => (state: RootState) =>
    state.memberList.members.find(
      m =>
        m.userId === state.userList.activeUser?.uid &&
        m.householdId === householdId
    );

export const selectMembersFromHousehold =
  (houseId: string) => (state: RootState) =>
    state.memberList.householdMembers.filter(s => s.householdId === houseId);

export const selectMembersToApprove =
  (householdId: string) => (state: RootState) =>
    state.memberList.householdMembers
      .filter(m => m.householdId == householdId && m.isApproved === false)
      .map(member => ({
        member,
        avatar: avatars.find(avatar => avatar.id == member.avatarId),
      }));
