import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card, useTheme } from "react-native-paper";
import MemberView from "../../components/MembersView";
import { HouseholdStackScreenProps } from "../../navigation/HouseHoldNavigator";
import { useAppSelector } from "../../redux/reduxHooks";

export default function MemberScreen({
  route,
}: HouseholdStackScreenProps<"medlemmar">) {
  const householdId = route.params.id;
  const { colors } = useTheme();
  const household = useAppSelector(state =>
    state.houseHoldList.houseHoldList.find(house => house.id === householdId)
  );

  return (
    <View style={styles.choreList}>
      <ScrollView>
        <MemberView householdId={householdId} />
      </ScrollView>
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
});
