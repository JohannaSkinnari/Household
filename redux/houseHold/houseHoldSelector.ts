import { avatars } from "../../assets/AvatarData/data";
import { RootState } from "../reduxStore";

export const getUserHouseholds = (state: RootState) =>
  state.houseHoldList.houseHoldList.map((house) => {
    const member = state.memberList.members.find(
      (member) => member.householdId === house.id
    );
    return {
      house,
      member,
      avatar: avatars.find((avatar) => avatar.id === member?.avatarId),
    };
  });

export const getHouseholdCodes = (state: RootState) => {
  const householdCodes = state.houseHoldList.houseHoldList.filter(
    (house) => house.houseHoldCode
  );
  return householdCodes;
};

export const getAvailableAvatars = (state: RootState) => {
  const availableAvatars = avatars.filter(
    (avatar) =>
      !state.memberList.members.some((member) => avatar.id === member.avatarId)
  );
  return availableAvatars;
};
