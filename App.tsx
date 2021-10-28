import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import firebase from "firebase/app";
import React from "react";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";
import { getTheme } from "./components/common/Theme";
import firebaseConfig from "./database/firebase";
import RootNavigation from "./navigation/RootNavigation";
import store from "./redux/reduxStore";

export default function App() {
  let Firebase: any;

  if (firebase.apps.length === 0) {
    Firebase = firebase.initializeApp(firebaseConfig);
    console.log(firebase.app().options);
  }

  const scheme = useColorScheme();
  const isDarkTheme = scheme === "dark";
  const theme = getTheme(isDarkTheme);
  return (
    <ReduxProvider store={store}>
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
    </ReduxProvider>
  );
}
