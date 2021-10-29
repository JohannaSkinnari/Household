import { avatars } from "../../assets/AvatarData/data";
import { IUser } from "../../interfaces/IUser";
import { RootState } from "../reduxStore";

export const selectMembersByHouseholdId =
  (householdId: string, currentUser: IUser) => (state: RootState) =>
    state.memberList.householdMembers
      .filter(member => member.householdId === householdId)
      .map(member => {
        const currentMember = state.memberList.members.find(
          m => m.userId === currentUser?.uid
        );
        return {
          currentMember,
          avatar: avatars.find(avatar => avatar.id === member?.avatarId),
        };
      });

export const selectOwnerOfHousehold =
  (householdId: string) => (state: RootState) =>
    state.memberList.members.find(
      m =>
        m.userId === state.userList.activeUser?.uid &&
        m.householdId === householdId
    );

export const selectMembersFromHousehold =
  (houseId: string) => (state: RootState) =>
    state.memberList.members.filter(s => s.householdId === houseId);
