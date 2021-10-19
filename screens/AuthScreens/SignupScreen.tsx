import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackScreenProps } from "../../navigation/RootNavigation";

export default function SignupScreen({
  navigation,
}: RootStackScreenProps<"SignUp">) {
  const { colors } = useTheme();
  return (
    <SafeAreaView>
      <Text style={{ color: colors.text }}>Hello from SignupScreen</Text>
      {/* använd custom component för knapp*/}
      <Button onPress={() => navigation.navigate("SignIn")}>Register</Button>
    </SafeAreaView>
  );
}
