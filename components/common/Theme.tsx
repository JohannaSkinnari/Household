import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import merge from "deepmerge";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      orange: string;
      pink: string;
      green: string;
      yellow: string;
      darkPink: string;
      blue: string;
      brown: string;
      purple: string;
      valueOne: string;
      valueTwo: string;
      valueFour: string;
      valueSix: string;
      valueEight: string;
      textInput: string;
    }
  }
}

const CustomDarkTheme = {
  ...NavigationDarkTheme,
  dark: true,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: "#C75267",
  },
};

const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  dark: false,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: "#CD5D6F",
  },
};

const CustomPaperDarkTheme: ReactNativePaper.Theme = {
  ...PaperDarkTheme,
  dark: true,
  colors: {
    ...PaperDarkTheme.colors,
    orange: "#E86D14",
    pink: "#E4A2AE",
    green: "#6BB255",
    yellow: "#F3C224",
    darkPink: "#C75267",
    blue: "#37B2D3",
    brown: "#9D7862",
    purple: "#AC8DCE",
    valueOne: "#BBB",
    valueTwo: "#AAA",
    valueFour: "#999",
    valueSix: "#888",
    valueEight: "#777",
    textInput: "#C75267",
  },
};

const CustomPaperDefaultTheme: ReactNativePaper.Theme = {
  ...PaperDefaultTheme,
  dark: false,
  colors: {
    ...PaperDefaultTheme.colors,
    orange: "#FF7E46",
    pink: "#F4A9BB",
    green: "#73C858",
    yellow: "#FCD933",
    darkPink: "#CD5D6F",
    blue: "#58D9ED",
    brown: "#CDAE8A",
    purple: "#B3A3D5",
    valueOne: "#F2F2F2",
    valueTwo: "#F1F0F0",
    valueFour: "#E9E7E7",
    valueSix: "#E1E1E1",
    valueEight: "#D9D9D9",
    textInput: "#FFFFFA",
  },
};

const CombinedDefaultTheme = merge(CustomPaperDefaultTheme, CustomDefaultTheme);
const CombinedDarkTheme = merge(CustomPaperDarkTheme, CustomDarkTheme);

export const getTheme = (dark: boolean) =>
  dark ? CombinedDarkTheme : CombinedDefaultTheme;
