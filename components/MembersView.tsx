import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { IMember } from "../interfaces/IMember";
import {
  selectMembersByHouseholdId,
  selectOwnerOfHousehold,
} from "../redux/member/memberSelectors";
import { activateMember, pauseMember } from "../redux/member/memberThunk";
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";

interface Props {
  householdId: string;
}

export default function MemberView({ householdId }: Props) {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  const MemberList = useAppSelector(selectMembersByHouseholdId(householdId));

  const admin = useAppSelector(selectOwnerOfHousehold(householdId));

  const pauseThisMember = (member: IMember) => {
    dispatch(pauseMember(member));
  };
  const activetThisMember = (member: IMember) => {
    dispatch(activateMember(member));
  };

  return (
    <>
      {MemberList.map(({ member, avatar }) => (
        <View key={member.id}>
          <View
            style={[styles.householdCard, { backgroundColor: colors.surface }]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={[styles.crown, { height: member?.isAdmin ? 30 : 0 }]}
                source={require("../assets/images/crown.png")}
              />
              <Text style={[styles.text, { color: colors.onSurface }]}>
                {member?.name}
              </Text>
            </View>
            <View style={styles.iconsContainer}>
              <Image style={styles.avatar} source={avatar?.icon} />
              {admin?.isAdmin && (
                <View style={[styles.active]}>
                  {member.isActive ? (
                    <TouchableOpacity onPress={() => pauseThisMember(member)}>
                      <Feather name="play" size={24} color={colors.green} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => activetThisMember(member)}>
                      <Feather name="pause" size={24} color={colors.darkPink} />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </View>
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
