import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getTheme } from "./components/common/Theme";

import RootNavigation from "./navigation/RootNavigation";

export default function App() {
  const scheme = useColorScheme();
  const isDarkTheme = scheme === "dark";
  const theme = getTheme(isDarkTheme);
  return (
    <AppearanceProvider>
      <SafeAreaProvider>
        <NavigationContainer theme={theme}>
          <PaperProvider theme={theme}>
            <StatusBar style="auto" />
            <RootNavigation />
          </PaperProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </AppearanceProvider>
  );
}
