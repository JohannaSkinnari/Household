import { Entypo } from "@expo/vector-icons";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs/lib/typescript/src/types";
import { NavigationState } from "@react-navigation/routers";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { HouseholdStackParamList } from "../navigation/HouseHoldNavigator";

interface Props {
  state: NavigationState;
  navigation: MaterialTopTabNavigationProp<HouseholdStackParamList>;
}

export default function CustomTabBar({ state, navigation }: Props) {
  const { colors } = useTheme();
  const activeRoute = state.routes[state.index];
  const prevRoute = state.routes[state.index - 1];
  const nextRoute = state.routes[state.index + 1];

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Pressable
        disabled={!prevRoute}
        onPress={() =>
          navigation.navigate(
            prevRoute.name as keyof HouseholdStackParamList,
            activeRoute.params as { id: string }
          )
        }
        style={styles.menuArrow}
      >
        <Entypo
          name="chevron-left"
          size={24}
          color={!prevRoute ? colors.disabled : colors.primary}
        />
      </Pressable>
      <Text style={{ color: colors.text }}>{activeRoute.name}</Text>
      <Pressable
        disabled={!nextRoute}
        onPress={() =>
          navigation.navigate(
            nextRoute.name as keyof HouseholdStackParamList,
            activeRoute.params as { id: string }
          )
        }
        style={styles.menuArrow}
      >
        <Entypo
          name="chevron-right"
          size={24}
          color={!nextRoute ? colors.disabled : colors.primary}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuArrow: {
    padding: 8,
  },
});
