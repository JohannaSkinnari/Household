import AntDesign from "@expo/vector-icons/build/AntDesign";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { IMember } from "../interfaces/IMember";
import { selectMembersToApprove } from "../redux/member/memberSelectors";
import { acceptMember, rejectMember } from "../redux/member/memberThunk";
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";

interface Props {
  householdId: string;
}

export default function ApproveView({ householdId }: Props) {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const memberList = useAppSelector(selectMembersToApprove(householdId));

  const acceptThisMember = (member: IMember) => {
    dispatch(acceptMember(member));
  };
  const rejectThisMember = (member: IMember) => {
    dispatch(rejectMember(member));
  };

  return (
    <>
      {memberList.map(({ member, avatar }) => (
        <TouchableOpacity key={member.id} onPress={() => setOpen(!open)}>
          <View
            style={[
              styles.householdCard,
              { backgroundColor: colors.surface, height: open ? 80 : 60 },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={[styles.text, { color: colors.onSurface }]}>
                  {member?.name}
                </Text>
              </View>
              <View style={styles.iconsContainer}>
                <Image style={styles.avatar} source={avatar?.icon} />
              </View>
            </View>
            {open && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  paddingBottom: 10,
                }}
              >
                <TouchableOpacity onPress={() => acceptThisMember(member)}>
                  <AntDesign
                    name="checkcircleo"
                    size={24}
                    color={colors.green}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => rejectThisMember(member)}>
                  <AntDesign
                    name="minuscircleo"
                    size={24}
                    color={colors.darkPink}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  householdCard: {
    margin: 10,
    width: 330,
    borderRadius: 12,
    paddingHorizontal: 15,
    flexDirection: "column",
    justifyContent: "space-around",
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
