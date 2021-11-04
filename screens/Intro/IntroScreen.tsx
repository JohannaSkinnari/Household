import { useTheme } from "react-native-paper";
import { View, Text,Image, StyleSheet } from "react-native";
import React from "react";
import PagerView from "react-native-pager-view";
import Constants from "expo-constants";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { RootStackScreenProps } from "../../navigation/RootNavigation";

export default function IntroScreen({
  navigation,
}: RootStackScreenProps<"SignUp">) {
  const { colors } = useTheme();

  return (

    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
      >
        <View key="1" style={[styles.page, { backgroundColor: colors.background }]}>
          <Text style={[styles.title, { color: colors.text }]}>Hushållet</Text>
          <View style={[styles.circle, { backgroundColor: colors.darkPink }]}>
            <Image
              style={styles.img}
              source={require("../../assets/images/LogoHouse.png")}
            />
          </View>
          <Text style={[styles.subtitle, { color: colors.text }]}>
          Skapa egna hushåll, gå med i hushåll, bjud in medlemmar, skapa sysslor som alla kan ta en del av 
och i slutändan få en statistisk övervy av dom slutförda sysslorna.   
          </Text>
          <TouchableWithoutFeedback
            onPress={async () => {
              navigation.navigate("Login");
            }}
          >
            <View  style={[styles.button, { backgroundColor: colors.surface , justifyContent: "flex-end" }]}>
              <Text style={{ color: colors.text }}>Skippa intro</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View key="2" style={[styles.page, { backgroundColor: colors.background }]}>
          <Text style={[styles.title, { color: colors.text }]}>Firestore databas</Text>
          <View style={[styles.circle, { backgroundColor: colors.darkPink }]}>
            <Image
              style={styles.img}
              source={require("../../assets/images/data.png")}
            />
          </View>
          <Text style={[styles.subtitle, { color: colors.text }]}>Ni kan tryggt lagra era hushåll och sysslor på en online databas för att dela dom med era medlemar. 
          </Text>
        </View>
        <View key="3" style={[styles.page, { backgroundColor: colors.background }]}>
          <Text style={[styles.title, { color: colors.text }]}>Dark Mode</Text>
          <View style={[styles.circle, { backgroundColor: colors.darkPink }]}>
            <Image
              style={styles.img}
              source={require("../../assets/images/darkMode.png")}
            />
          </View>
          <Text style={[styles.subtitle, { color: colors.text }]}>Ni kan använda appen bekvämt om natten med med en DarkMode 
          inställning som ni hittar på profilsidan.
          </Text>
        </View>
        <View key="4" style={[styles.page, { backgroundColor: colors.background }]}>
          <Text style={[styles.title, { color: colors.text }]}>Så lått oss börja !!</Text>
          <View style={[styles.circle, { backgroundColor: colors.darkPink }]}>
            <Image
              style={[styles.img, { width: 100, 
                height: 100 }]}
              source={require("../../assets/images/Logo.png")}
            />
          </View>
          
          <Text style={[styles.subtitle, { color: colors.text }]}>Börja med att logga in med dina inloggnings uppgifter !
          </Text>
          <TouchableWithoutFeedback
            onPress={async () => {
              navigation.navigate("Login");
            }}
          >
            <View  style={[styles.button, { backgroundColor: colors.surface }]}>
              <Text style={{ color: colors.text }}>Till Inloggning</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  circle: {
    width: 144,
    height: 144,
    borderRadius: 72,
    backgroundColor: "#B1B1B1",
    justifyContent: "center",
    alignItems: "center",
  },
  img:{
    width: 70, 
    height: 70, 
    tintColor: "white" 
  },

  subtitle: {
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
});
