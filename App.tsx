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
import { removeChoreState } from "./redux/chore/choreSlice";
import { removeCompletedChoreState } from "./redux/completedChores/completedChoreSlice";
import { removeHouseholdState } from "./redux/houseHold/houseHoldSlice";
import { removeMemberState } from "./redux/member/memberSlice";
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
    const unsubscribe = Firebase.auth().onAuthStateChanged(user => {
      console.log("IN USEFFECT");
      // console.log(user?.toJSON() as IUser);
      if (user) {
        console.log("SETTING DATA NOW");
        dispatch(setUser(user.toJSON() as IUser));
        dispatch(loadData(user.toJSON() as IUser));
      } else {
        console.log("REMOVING DATA NOW");
        dispatch(removeUser(null));
        dispatch(removeHouseholdState([]));
        dispatch(removeChoreState([]));
        dispatch(removeCompletedChoreState([]));
        dispatch(removeMemberState([]));
      }
    });
    return unsubscribe;
  }, []);

  return null;
};
