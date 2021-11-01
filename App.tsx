import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import firebase from "firebase/app";
import React from "react";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";
import { CustomDarkTheme, CustomDefaultTheme, CustomPaperDarkTheme, CustomPaperDefaultTheme, getTheme } from "./components/common/Theme";
import firebaseConfig from "./database/firebase";
import RootNavigation from "./navigation/RootNavigation";
import { useAppSelector } from "./redux/reduxHooks";
import store from "./redux/reduxStore";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <Navigation />
    </ReduxProvider>
  );
}
  
  export function Navigation() {

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }


/*   const scheme = useColorScheme();
  const isDarkTheme = scheme === "dark";
  const theme = getTheme(isDarkTheme);
  */
  const currentTheme = useAppSelector(state=>state.DarkMode)
  
  return (
    <ReduxProvider store={store}>
      <AppearanceProvider>
        <SafeAreaProvider>
          <NavigationContainer theme={currentTheme?CustomDarkTheme:CustomDefaultTheme}>
            <PaperProvider theme={currentTheme?CustomPaperDarkTheme:CustomPaperDefaultTheme}>
              <StatusBar style="auto" />
              <RootNavigation />
            </PaperProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </AppearanceProvider>
    </ReduxProvider>
  );
}
