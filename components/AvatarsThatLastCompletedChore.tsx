import React from "react";
import { Image, StyleSheet } from "react-native";
import { avatars } from "../assets/AvatarData/data";
import { selectLastCompletedChores } from "../redux/completedChores/completedChoreSelectors";
import { useAppSelector } from "../redux/reduxHooks";

interface IAvatar {
  icon: any;
  id: number;
}
interface Props {
  choreId: string;
}

export default function AvatarsThatLastCompletedChore({ choreId }: Props) {
  const lastCompletedChores = useAppSelector(
    selectLastCompletedChores(choreId)
  );

  const allMembers = useAppSelector(state =>
    state.memberList.members.filter(m => m)
  );

  const memberAvatars: IAvatar[] = [];

  if (lastCompletedChores) {
    lastCompletedChores.forEach(c => {
      const member = allMembers?.find(m => m.id === c.memberId);
      const avatar = avatars.find(a => a.id === member?.avatarId);
      if (avatar) {
        memberAvatars.push(avatar);
      }
    });
  }

  return (
    <>
      {memberAvatars.map((avatar, i) => (
        <Image key={i} style={styles.avatar} source={avatar.icon} />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 30,
    width: 30,
  },
});
