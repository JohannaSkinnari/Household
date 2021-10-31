import { avatars } from "../../assets/AvatarData/data";
import { RootState } from "../reduxStore";

export const selectUserHouseholds = (state: RootState) =>
  state.houseHoldList.houseHoldList.map(house => {
    const user = state.userList.activeUser;
    const member = state.memberList.members.find(
      m => user?.uid === m.userId && m.householdId == house.id
    );
    return {
      house,
      member,
      avatar: avatars.find(avatar => avatar.id === member?.avatarId),
    };
  });

export const selectHouseholdCodes = (state: RootState) => {
  const householdCodes = state.houseHoldList.otherHouseholds.map(
    house => house.houseHoldCode
  );
  return householdCodes;
};

export const selectOtherHouseholds = (state: RootState) => {
  const households = state.houseHoldList.otherHouseholds.map(house => house);
  return households;
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
