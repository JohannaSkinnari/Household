import firebase from "firebase";
import React from "react";
import { Text, View, Image, StyleSheet  } from "react-native";
import { Button } from "react-native-paper";
import CustomButton from "../../components/common/CustomButton";
import { ProfileStackScreenProps } from "../../navigation/ProfileNavigator";
import { RootStackScreenProps } from "../../navigation/RootNavigation";





const onSignOut =  () => {
  firebase.auth().signOut()
.then(() => {
  //navigation.navigate("LogIn")
  console.log('Signed Out');
})
.catch(e=>{
 console.error('Sign Out Error', e);
});
};


export default function ProfileScreen({navigation}: ProfileStackScreenProps<"Profile">) {
  const user = firebase.auth().currentUser;
  return (
    <View>
       <Text> Hej {user?.displayName} profilsidan</Text>
       <CustomButton onPress={onSignOut} title="Logga ut" />
     {/*  <Image source={{ uri: user.photoURL }} style={styles.image} /> */}
      {/* använd custom component för knapp*/}
      <Button onPress={() => navigation.navigate("JoinHousehold")}>Join Household</Button>
      <Button onPress={() => navigation.navigate("CreateHousehold")}>Create Household</Button>
      <Button onPress={() => navigation.navigate("Household")}>Household</Button>
      <Button onPress={() => navigation.navigate("HouseholdSettings")}>HouseholdSettings</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 222,
    marginBottom: 20,
  },
});