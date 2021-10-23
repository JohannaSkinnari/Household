import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { avatars } from "../../assets/AvatarData/data";
import AvatarList from "../../components/AvatarList";
import CustomButton from "../../components/common/CustomButton";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";
import { useAppSelector } from "../../redux/reduxHooks";

export default function HouseholdInfoScreen({
  navigation,
  route,
}: ProfileStackScreenProps<"HouseholdInfo">) {
  const houseId = route.params.id;
  const { colors } = useTheme();

  const members = useAppSelector((state) =>
    state.memberList.members.filter((s) => s.householdId === houseId)
  );
  const availableAvatars = avatars.filter(
    (avatar) => !members.some((member) => avatar.id === member.avatarId)
  );

  return (
    <View style={[styles.root]}>
      <View style={[styles.infoStyle, { backgroundColor: colors.blue }]}>
        <Text style={[styles.textStyle, { color: colors.onSurface }]}>
          Välj din avatar
        </Text>
        <Text style={{ color: colors.onSurface }}>
          (Tillgängliga avatarer i hushållet)
        </Text>
      </View>
      <View style={[styles.imageStyle, { backgroundColor: colors.green }]}>
        <AvatarList
          value={0}
          dataArray={availableAvatars}
          onChange={function (id: string): void {
            throw new Error("Function not implemented.");
          }}
        />
      </View>
      <View
        style={[styles.buttonsContainer, { backgroundColor: colors.orange }]}
      >
        <CustomButton
          icon="plus-circle-outline"
          title={"Spara"}
          onPress={() => navigation.navigate("Profile")}
        />
        <CustomButton
          icon="close-circle-outline"
          title={"Stäng"}
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  infoStyle: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  textStyle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonsContainer: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});

{
  /* {availableAvatars.map((avatar) => (
          <Image
            style={{ height: 50, width: 50 }}
            key={avatar.id}
            source={avatar.icon}
          />
        ))} */
}
