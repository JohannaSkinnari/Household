import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { LogBox } from "react-native";
import { AppearanceProvider } from "react-native-appearance";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";
import { CustomDarkTheme, CustomDefaultTheme, CustomPaperDarkTheme, CustomPaperDefaultTheme} from "./components/common/Theme";
import { useAppSelector } from "./redux/reduxHooks";
import Firebase from "./database/config";
import { Listener } from "./database/listeners";
import { IUser } from "./interfaces/IUser";
import RootNavigation from "./navigation/RootNavigation";
import { loadBackgroundData, loadData } from "./redux/auth/authThunk";
import { removeChoreState } from "./redux/chore/choreSlice";
import { removeCompletedChoreState } from "./redux/completedChores/completedChoreSlice";
import { removeHouseholdState } from "./redux/houseHold/houseHoldSlice";
import { removeMemberState } from "./redux/member/memberSlice";
import store, { useAppDispatch } from "./redux/reduxStore";
import { removeUser, setUser } from "./redux/user/userSlice";

LogBox.ignoreLogs(["Setting a timer"]);
export default function App() {
  return (
    <ReduxProvider store={store}>
      <Navigation />
    </ReduxProvider>
  );
}
  
  export function Navigation() {

  const currentTheme = useAppSelector(state=>state.DarkMode)
  
  return (
    <ReduxProvider store={store}>
      <AppearanceProvider>
        <SafeAreaProvider>
          <NavigationContainer theme={currentTheme?CustomDarkTheme:CustomDefaultTheme}>
            <PaperProvider theme={currentTheme?CustomPaperDarkTheme:CustomPaperDefaultTheme}>
              <StatusBar style="auto" />
              <RootNavigation />
              <FirebaseSetup />
              <Listener />
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
      if (user) {
        dispatch(setUser(user.toJSON() as IUser));
        dispatch(loadData(user.toJSON() as IUser));
        dispatch(loadBackgroundData(user.toJSON() as IUser));
      } else {
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
