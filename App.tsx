import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getTheme } from "./components/common/Theme";
import { firebaseConfig } from "./database/firebase";
import firebase from "firebase/app";
import { Provider as ReduxProvider } from "react-redux";
import RootNavigation from "./navigation/RootNavigation";
import store, { useAppDispatch } from "./redux/reduxStore";
import { removeUser, setUser } from "./redux/user/userSlice";

export default function App() {
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
              <FirebaseSetup />
            </PaperProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </AppearanceProvider>
    </ReduxProvider>
  );
}

const FirebaseSetup = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        dispatch(setUser(user));
        // Dispatch user to redux store!
      } else {
        dispatch(removeUser(null));
        // User is signed out
        // Remove user from redux store!
      }
    });
  }, []);

  return null;
};
