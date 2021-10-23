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
