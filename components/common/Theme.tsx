// ifall vi behöver customize:a mer med defaultheme från navigator
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";

// för navigationen
export const CustomDarkTheme = {
  dark: true,
  colors: {
    primary: "#9933FF",
    background: "#000023",
    card: "#000028",
    text: "#ffffff",
    border: "#000028",
    notification: "#9933FF",
  },
};

export const CustomDefaultTheme = {
  dark: false,
  colors: {
    primary: "#FFFFFF",
    background: "#FFFFFF",
    card: "#FFFFFF",
    text: "#00000",
    border: "#FFFFFF",
    notification: "#FFFFFF",
  },
};

// för Paper componenter
export const CustomPaperDarkTheme = {
  ...PaperDarkTheme,
  dark: true,
  colors: {
    ...PaperDarkTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
  },
};

export const CustomPaperDefaultTheme = {
  ...PaperDefaultTheme,
  dark: false,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
  },
};
