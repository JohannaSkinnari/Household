import React from "react";
import { Image, StyleSheet } from "react-native";

interface Props {
  choreId: string;
}

export default function AvatarsThatLastCompletedChore({ choreId }: Props) {
  const members = [
    { id: "1", userId: "1", householdId: "1", isAdmin: true, avatarId: 1 },
    { id: "1", userId: "2", householdId: "1", isAdmin: true, avatarId: 2 },
  ];

  return (
    <>
      {members.map(member => (
        // <Image style={styles.avatar} source={require("..")} />
        <Image style={styles.avatar} source={require("..")} />
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
