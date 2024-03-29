import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card, useTheme } from "react-native-paper";
import ApproveView from "../../components/ApproveView";
import MemberView from "../../components/MembersView";
import { HouseholdStackScreenProps } from "../../navigation/HouseHoldNavigator";
import { selectHouseholdById } from "../../redux/houseHold/houseHoldSelector";
import { selectOwnerOfHousehold } from "../../redux/member/memberSelectors";
import { useAppSelector } from "../../redux/reduxHooks";

export default function MemberScreen({
  route,
}: HouseholdStackScreenProps<"medlemmar">) {
  const householdId = route.params.id;
  const { colors } = useTheme();
  const household = useAppSelector(selectHouseholdById(householdId));
  const admin = useAppSelector(selectOwnerOfHousehold(householdId));

  return (
    <View style={styles.choreList}>
      <ScrollView>
        <MemberView householdId={householdId} />
      </ScrollView>
      {admin?.isAdmin && (
        <ScrollView>
          <Text style={[styles.text, { color: colors.text }]}>Förfrågan:</Text>
          <ApproveView householdId={householdId} />
        </ScrollView>
      )}
      <View style={styles.bottomView}>
        <Card style={[styles.card, { backgroundColor: colors.surface }]}>
          <Card.Content style={styles.cardContent}>
            <Text style={[styles.titleText, { color: colors.onSurface }]}>
              {household?.name}
              ´s kod:
            </Text>
            <Text style={[styles.codeText, { color: colors.onSurface }]}>
              {household?.houseHoldCode}
            </Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  choreList: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  bottomView: {
    width: "100%",
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "60%",
    borderRadius: 10,
    marginBottom: 15,
    padding: 0,
  },
  cardContent: {
    borderRadius: 10,
    padding: 0,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 16,
  },
  codeText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 5,
  },
  text: {
    fontSize: 20,
    width: 330,
    margin: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});
