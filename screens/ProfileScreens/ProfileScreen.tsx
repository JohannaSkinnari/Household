import firebase from "firebase";
import React from "react";
import { StyleSheet, View ,Text} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import CustomButton from "../../components/common/CustomButton";
import HouseHoldView from "../../components/HouseHoldsView";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";
import { RootStackScreenProps } from "../../navigation/RootNavigation";








export default function ProfileScreen({
  navigation,
}: ProfileStackScreenProps<"Profile">) {
  const { colors } = useTheme();
  const user = firebase.auth().currentUser;

  const onSignOut =  () => {
    firebase.auth().signOut()
  .then(() => {
    navigation.navigate("Login")
    console.log('Signed Out');
  })
  .catch(e=>{
   console.error('Sign Out Error', e);
  });
  };


  function navigateTo(id: string) {
    navigation.navigate("Household", { id });
  }

  return (
    <View style={{ flex: 1 }}>
      <Text> Hej {user?.displayName} profilsidan</Text>
       <CustomButton onPress={onSignOut} title="Logga ut" />
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
  image: {
    width: 250,
    height: 222,
    marginBottom: 20,
  },

  root: {
    flex: 1,
  },
  houseList: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
