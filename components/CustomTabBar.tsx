// import { Button, useTheme } from "react-native-paper";
import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { HouseholdAllStackScreenProps } from "../navigation/HouseHoldNavigator";


export default function CustomTabBar({navigation}: HouseholdAllStackScreenProps) {
  // const { colors } = useTheme();
  return (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <Button title={"<"} onPress={() => navigation.navigate("Chores")}/>
      <Text>Header</Text>
      <Button title={">"} onPress={() => navigation.navigate("Chores")}/>
      
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderRadius: 20,
  }
})