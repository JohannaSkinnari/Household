import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import CustomButton from "../../components/common/CustomButton";
import HouseHoldView from "../../components/HouseHoldsView";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";

export default function ProfileScreen({
  navigation,
}: ProfileStackScreenProps<"Profile">) {
  const { colors } = useTheme();

  function navigateTo(id: string) {
    navigation.navigate("Household", { id });
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}></View>
      <View style={[styles.houseList, { flex: 6 }]}>
        <ScrollView>
          <HouseHoldView onSelectedHouse={navigateTo} />
        </ScrollView>
      </View>
      <View style={[{ justifyContent: "flex-end", flex: 2 }]}>
        <View
          style={{
            justifyContent: "space-evenly",
            flexDirection: "row",
            marginBottom: 20,
          }}
        >
          <CustomButton
            onPress={() => navigation.navigate("JoinHousehold")}
            title={"Gå med i Hushåll"}
          />
          <CustomButton
            onPress={() => navigation.navigate("CreateHousehold")}
            title={"Skapa Hushåll"}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  houseList: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
