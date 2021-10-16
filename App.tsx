import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { Provider as PaperProvider } from "react-native-paper";
import {
  CustomDarkTheme,
  CustomDefaultTheme,
  CustomPaperDarkTheme,
  CustomPaperDefaultTheme,
} from "./components/Theme";
import RootNavigation from "./navigation/RootNavigation";

export default function App() {
  const scheme = useColorScheme();
  return (
    <AppearanceProvider>
      <NavigationContainer
        theme={scheme === "dark" ? CustomDarkTheme : CustomDefaultTheme}
      >
        <PaperProvider
          theme={
            scheme === "dark" ? CustomPaperDarkTheme : CustomPaperDefaultTheme
          }
        >
          <StatusBar style="auto" />
          <RootNavigation />
        </PaperProvider>
      </NavigationContainer>
    </AppearanceProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
