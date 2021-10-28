import { avatars } from "../../assets/AvatarData/data";
import { RootState } from "../reduxStore";

export const selectUserHouseholds = (state: RootState) =>
  state.houseHoldList.houseHoldList.map(house => {
    const user = state.userList.activeUser;
    const member = state.memberList.members.find(
      m => m.householdId === house.id && user?.uid === member.userId
    );
    return {
      house,
      member,
      avatar: avatars.find(avatar => avatar.id === member?.avatarId),
    };
  });

export const selectHouseholdCodes = (state: RootState) => {
  const householdCodes = state.houseHoldList.houseHoldList.filter(
    house => house.houseHoldCode
  );
  return householdCodes;
};

export const getAvailableAvatars = (state: RootState) => {
  const availableAvatars = avatars.filter(
    avatar =>
      !state.memberList.members.some(member => avatar.id === member.avatarId)
  );
  return availableAvatars;
};

export const selectHouseholdById =
  (householdId: string) => (state: RootState) =>
    state.houseHoldList.houseHoldList.find(house => house.id === householdId);
