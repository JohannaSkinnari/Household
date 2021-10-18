import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { RootStackScreenProps } from "../../navigation/RootNavigation";

export default function SignupScreen({navigation}: RootStackScreenProps<"SignUp">) {
  const { colors } = useTheme();
  return (
    <View style={styles.headerStandInFix}>
      <Text style={{ color: colors.text }}>Hello from SignupScreen</Text>
      {/* använd custom component för knapp*/}
      <Button onPress={() => navigation.navigate("SignIn")}>Register</Button>
      
    </View>
  );
}

const styles = StyleSheet.create({
  headerStandInFix: {
    marginTop: 50
  }
})