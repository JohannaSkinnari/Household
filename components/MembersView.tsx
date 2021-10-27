import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { avatars } from "../assets/AvatarData/data";
import { useAppSelector } from "../redux/reduxHooks";

interface Props {
  householdId: string;
}

export default function MemberView({ householdId }: Props) {
  const { colors } = useTheme();
  const currentUser = useAppSelector((state) => state.userList.activeUser);
  const MemberList = useAppSelector((state) =>
    state.memberList.members
      .filter((member) => member.householdId === householdId)
      .map((member) => {
        const currentMember = state.memberList.members.find(
          (m) => m.userId === currentUser?.uid
        );
        return {
          currentMember,
          avatar: avatars.find((avatar) => avatar.id === member?.avatarId),
        };
      })
  );

  return (
    <>
      {MemberList.map(({ currentMember, avatar }) => (
        <View key={currentMember?.id}>
          <TouchableOpacity
            style={[styles.householdCard, { backgroundColor: colors.surface }]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={[
                  styles.crown,
                  { height: currentMember?.isAdmin ? 30 : 0 },
                ]}
                source={require("../assets/images/crown.png")}
              />
              <Text style={[styles.text, { color: colors.onSurface }]}>
                {currentMember?.name}
              </Text>
            </View>
            <View style={styles.iconsContainer}>
              <Image style={styles.avatar} source={avatar?.icon} />
              <View style={styles.active}></View>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  householdCard: {
    margin: 10,
    height: 60,
    width: 330,
    borderRadius: 12,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  crown: {
    width: 30,
    marginRight: 8,
    alignItems: "center",
  },
  text: {
    fontWeight: "500",
    fontSize: 18,
  },
  avatar: {
    height: 30,
    width: 30,
  },
  active: {
    height: 30,
    width: 30,
  },
});
