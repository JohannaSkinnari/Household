import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { avatars } from "../../assets/AvatarData/data";
import PieChartView from "../../components/PieChartView";
import { HouseholdStackScreenProps } from "../../navigation/HouseHoldNavigator";
import { selectChoresByHouseholdId } from "../../redux/chore/choreSelectors";
import {
  selectChoresMembersData,
  selectCompletedChoresByHouseholdId,
  selectTotalMembersData,
} from "../../redux/completedChores/completedChoreSelectors";
import { useAppSelector } from "../../redux/reduxHooks";

export default function CurrentWeekStatisticScreen({
  route,
}: HouseholdStackScreenProps<"veckan">) {
  const { colors } = useTheme();
  const householdId = route.params.id;

  const totalMembersData = useAppSelector(selectTotalMembersData(householdId));
  const choreMembersData = useAppSelector(selectChoresMembersData(householdId));
  const houseChores = useAppSelector(selectChoresByHouseholdId(householdId));
  const houseCompletedChores = useAppSelector(
    selectCompletedChoresByHouseholdId(householdId)
  );

  return (
    <View style={{ flex: 1, height: "100%" }}>
      <ScrollView
        style={[styles.root, { height: "100%" }]}
        contentContainerStyle={{ justifyContent: "space-between" }}
      >
        <View style={styles.choreTotalPieContainer}>
          <PieChartView
            widthAndHeight={200}
            series={totalMembersData.map(md => md.totalWeight)}
            sliceColor={totalMembersData.map(md => {
              console.log("AvatarId:", md);
              const avatarColor = avatars.find(a => a.id === md.avatar)?.color;
              if (!avatarColor) return colors.primary;
              return colors[avatarColor];
            })}
            isTotal
            title="Totalt"
          />
        </View>

        {totalMembersData.map(tmd => {
          const activeMemberAvatar = avatars.find(a => a.id === tmd.avatar);
          return (
            <View key={activeMemberAvatar?.id} style={styles.iconsContainer}>
              <Image source={activeMemberAvatar?.icon} />
            </View>
          );
        })}
        <View style={styles.chorePiesContainer}>
          {choreMembersData.map(item => (
            <PieChartView
              key={item.choreId}
              widthAndHeight={100}
              series={item.membersData.map(m => m.totalWeight)}
              sliceColor={[colors.blue, colors.green]}
              isTotal={false}
              title={
                houseChores.find(
                  hc =>
                    hc.id ===
                    houseCompletedChores.find(
                      hcc => hcc.choreId === item.choreId
                    )?.choreId
                )?.name || "Error: Could not get chore name"
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingVertical: 5,
    paddingTop: 20,
  },
  choreTotalPieContainer: {
    height: "50%",
    flex: 1,
  },
  chorePiesContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    height: "50%",
    marginBottom: 65,
  },
  iconsContainer: {
    marginRight: 8,
    flexDirection: "row",
  },
});
