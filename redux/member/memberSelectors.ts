import { avatars } from "../../assets/AvatarData/data";
import { RootState } from "../reduxStore";

export const selectMembersByHouseholdId =
  (householdId: string) => (state: RootState) =>
    state.memberList.members
      .filter(member => member.householdId === householdId)
      .map(member => {
        const user = state.userList.users.find(u => u.id === member.userId);
        return {
          member,
          user,
          avatar: avatars.find(avatar => avatar.id === member?.avatarId),
        };
      });

export const selectOwnerOfHousehold =
  (householdId: string) => (state: RootState) =>
    state.memberList.members.find(
      m =>
        m.userId === state.userList.activeUser.id &&
        m.householdId === householdId
    );

export const selectMembersFromHousehold =
  (houseId: string) => (state: RootState) =>
    state.memberList.members.filter(s => s.householdId === houseId);
