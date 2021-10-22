import { avatars } from "../../assets/AvatarData/data";
import { RootState } from "../reduxStore";

export const selectedhouseholdlist = (state: RootState) =>
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
