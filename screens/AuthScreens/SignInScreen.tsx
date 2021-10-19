import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackScreenProps } from "../../navigation/RootNavigation";

export default function SignInScreen({
  navigation,
}: RootStackScreenProps<"SignIn">) {
  const { colors } = useTheme();
  return (
    <SafeAreaView>
      <Text style={{ color: colors.text }}>Hello from LoginScreen</Text>
      {/* använd custom component för knapp*/}
      <Button onPress={() => navigation.navigate("ProfileNav")}>Sign In</Button>
      <Button onPress={() => navigation.navigate("SignUp")}>Sign Up</Button>
    </SafeAreaView>
  );
}
