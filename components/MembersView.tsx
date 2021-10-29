import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import {
  selectMembersByHouseholdId,
  selectOwnerOfHousehold,
} from "../redux/member/memberSelectors";
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import { IMember } from "../interfaces/IMember";

interface Props {
  householdId: string;
}

export default function MemberView({ householdId }: Props) {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  const MemberList = useAppSelector(selectMembersByHouseholdId(householdId));

  const admin = useAppSelector(selectOwnerOfHousehold(householdId));

  //  const pauseMember = (member: IMember) => {
  //     dispatch(pauseMember(member));
  //   };
  //   const activetMember = (member: IMember)  => {
  //     dispatch(activetMember(member));
  //   };

  return (
    <>
      {MemberList.map(({ member, user, avatar }) => (
        <View key={member.id}>
          <TouchableOpacity
            style={[styles.householdCard, { backgroundColor: colors.surface }]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={[styles.crown, { height: member?.isAdmin ? 30 : 0 }]}
                source={require("../assets/images/crown.png")}
              />
              <Text style={[styles.text, { color: colors.onSurface }]}>
                {user?.name}
              </Text>
            </View>
            <View style={styles.iconsContainer}>
              <Image style={styles.avatar} source={avatar?.icon} />
              <View
                style={[
                  styles.active,
                  {
                    height: member.id === admin?.id ? 30 : 0,
                  },
                ]}
              >
                {member.isActive ? (
                  <Pressable>
                    <Feather name="play" size={24} color={colors.green} />
                  </Pressable>
                ) : (
                  <Pressable>
                    <Feather name="pause" size={24} color={colors.darkPink} />
                  </Pressable>
                )}
              </View>
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
    marginLeft: 20,
  },
});
