import { AntDesign, FontAwesome } from "@expo/vector-icons";
import firebase from "firebase";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import CustomButton from "../../components/common/CustomButton";
import HouseHoldView from "../../components/HouseHoldsView";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";

export default function ProfileScreen({
  navigation,
}: ProfileStackScreenProps<"Profile">) {
  const { colors } = useTheme();
  const user = firebase.auth().currentUser;

  const onSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate("Login");
        console.log("Signed Out");
        console.log(firebase.auth().currentUser);
      })
      .catch(e => {
        console.error("Sign Out Error", e);
      });
  };

  function navigateTo(id: string) {
    navigation.navigate("Household", { id });
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <View style={styles.userNameContainer}>
          <FontAwesome name="user-circle-o" size={24} color="#c75267" />
          <Text style={[styles.headerText, { color: colors.text }]}>
            {"   "}
            {user?.displayName}
            {"  "}
          </Text>
        </View>

        <TouchableOpacity
          onPress={onSignOut}
          style={[styles.buttonStyle, { backgroundColor: colors.darkPink }]}
          activeOpacity={0.5}
        >
          <View style={styles.buttonIconStyle}>
            <AntDesign name="logout" size={18} color="white" />
          </View>
          <Text style={styles.buttonTextStyle}>Logga ut </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }} />
      <View style={[styles.houseList, { flex: 6 }]}>
        <ScrollView>
          <HouseHoldView onSelectedHouse={navigateTo} onSelectedHouseSetup ={navigation.navigate}/>
        </ScrollView>
      </View>
      <View style={[{ justifyContent: "flex-end", flex: 6 }]}>
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
    backgroundColor: "#485a96",
    borderWidth: 0.5,
    borderColor: "#fff",
    height: 35,
    borderRadius: 20,
    margin: 5,
    justifyContent: "space-evenly",
  },
  buttonIconStyle: {
    padding: 8,
  },
  buttonTextStyle: {
    color: "#fff",
    marginHorizontal: 5,
  },

  root: {
    flex: 1,
  },
  houseList: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
