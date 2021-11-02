import { avatars } from "../../assets/AvatarData/data";
import { RootState } from "../reduxStore";

export const selectAllMembers = (state: RootState) => state.memberList.members;

export const selectMembersByHouseholdId =
  (householdId: string) => (state: RootState) =>
    state.memberList.householdMembers
      .filter(m => m.householdId == householdId)
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
