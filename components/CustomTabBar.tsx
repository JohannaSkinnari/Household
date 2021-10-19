// import { Button, useTheme } from "react-native-paper";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { color } from "react-native-reanimated";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { HouseholdAllStackScreenProps } from "../navigation/HouseHoldNavigator";


export default function CustomTabBar({navigation, route}: HouseholdAllStackScreenProps) {
  const { colors } = useTheme();
  // const title = route.name;
  return (
    <View style={[styles.container, {backgroundColor: colors.surface}]}>
      {/* <Button color={colors.surface} title={"<"} onPress={() => navigation.navigate("Chores")}/> */}
      <Button  onPress={() => navigation.navigate("PreviousWeek")}> {"<"} </Button>
      <Text style={{color: colors.text}}>Hej</Text>
      {/* <Button color={colors.surface} title={">"} onPress={() => navigation.navigate("Members")}/> */}
      <Button  onPress={() => navigation.navigate("Members")}> {">"} </Button>
      
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
})