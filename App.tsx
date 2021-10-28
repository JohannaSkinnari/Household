import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { LogBox } from "react-native";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";
import { getTheme } from "./components/common/Theme";
import Firebase from "./database/config";
import { IUser } from "./interfaces/IUser";
import RootNavigation from "./navigation/RootNavigation";
import { loadData } from "./redux/auth/authThunk";
import store, { useAppDispatch } from "./redux/reduxStore";
import { removeUser, setUser } from "./redux/user/userSlice";
LogBox.ignoreLogs(["Setting a timer"]);

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
    const unsubscribe = Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user.toJSON() as IUser));
        dispatch(loadData(user.toJSON() as IUser));
      } else {
        dispatch(removeUser(null));
        // clear data vanlig action. till tomma []
        // User is signed out
        // Remove user from redux store!
      }
    });
    return () => unsubscribe();
  }, []);

  return null;
};
