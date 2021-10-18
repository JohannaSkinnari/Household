import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { RootStackScreenProps } from "../../navigation/RootNavigation";

export default function SignInScreen({navigation}: RootStackScreenProps<"SignIn">) {
  const { colors } = useTheme();
  return (
    <View style={styles.headerStandInFix}>
      <Text style={{ color: colors.text }}>Hello from LoginScreen</Text>
      <Button onPress={() => navigation.navigate("ProfileNav")}>Sign In</Button>
      <Button onPress={() => navigation.navigate("SignUp")}>Sign Up</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  headerStandInFix: {
    marginTop: 50
  }
})