import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "../../components/common/CustomButton";
import Firebase from "../../database/config";
import HouseHoldView from "../../components/HouseHoldsView";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";

export default function ProfileScreen({
  navigation,
}: ProfileStackScreenProps<"Profile">) {
  const { colors } = useTheme();
  const [showToggle, setShowToggle] = useState<boolean>(false);

  const onSignOut = () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch(e => {
        console.error("Sign Out Error", e);
      });
  };

  function navigateToHousehold(id: string) {
    navigation.navigate("Household", { id });
  }

  function navigateToSettings(id: string) {
    navigation.navigate("HouseholdSettings", { id });
  }

  const toggleEnableSetup = () => {
    setShowToggle(!showToggle);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          onPress={toggleEnableSetup}
          style={[
            styles.buttonStyle,
            { borderColor: colors.darkPink, borderWidth: 0.5 },
          ]}
          activeOpacity={0.5}
        >
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.logoIcon}
          />
          <Text style={[styles.buttonTextStyle, { color: colors.text }]}>
            Ändra
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSignOut}
          style={[styles.buttonStyle, { backgroundColor: colors.darkPink }]}
          activeOpacity={0.5}
        >
          <View style={styles.buttonIconStyle}>
            <AntDesign name="logout" size={16} color="white" />
          </View>
          <Text style={styles.buttonTextStyle}>Logga ut </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }} />
      <View style={[styles.houseList, { flex: 6 }]}>
        <ScrollView>
          <HouseHoldView
            onSelectedHouse={navigateToHousehold}
            onSelectedHouseSetup={navigateToSettings}
            isVisible={showToggle}
          />
        </ScrollView>
      </View>
      <View style={[{ justifyContent: "flex-end", flex: 1 }]}>
        <View
          style={{
            justifyContent: "space-evenly",
            flexDirection: "row",
            marginBottom: 20,
          }}
        >
          <CustomButton
            onPress={() => navigation.navigate("JoinHousehold")}
            title="Gå med i Hushåll"
          />
          <CustomButton
            onPress={() => navigation.navigate("CreateHousehold")}
            title="Skapa Hushåll"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#c75267",
    shadowOpacity: 0.8,
    elevation: 20,
    shadowOffset: { width: 3, height: 3 },
    justifyContent: "space-between",
  },

  userNameContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },

  headerText: {
    textTransform: "uppercase",
    fontSize: 18,
  },
  buttonStyle: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#fff",
    height: 25,
    paddingHorizontal: 2,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    justifyContent: "space-evenly",
  },
  buttonIconStyle: {
    margin: 5,
  },
  buttonTextStyle: {
    color: "#fff",
    marginHorizontal: 5,
    fontSize: 13,
  },

  root: {
    flex: 1,
  },
  houseList: {
    justifyContent: "flex-start",
    alignItems: "center",
  },

  logoIcon: {
    height: 25,
    width: 25,
    resizeMode: "stretch",
  },
});
