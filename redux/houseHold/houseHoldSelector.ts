import { avatars } from "../../assets/AvatarData/data";
import { RootState } from "../reduxStore";

export const selectUserHouseholds = (state: RootState) =>
  state.houseHoldList.houseHoldList.map(house => {
    const member = state.memberList.members.find(
      m => m.householdId == house.id
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

export const selectHouseholdById =
  (householdId: string) => (state: RootState) =>
    state.houseHoldList.houseHoldList.find(house => house.id === householdId);
