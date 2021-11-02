import React from "react";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper";

interface ErrorProps {
  error?: string;
  visible?: boolean;
}

const ErrorMessage: React.FC<ErrorProps> = ({ error, visible }) => {
  const { colors } = useTheme();
  if (!error || !visible) {
    return null;
  }

  return (
    
    <Text style={[styles.errorText, { color: colors.darkPink }]}>
      ⚠️
      {error}
    </Text>
  );
};

const styles = StyleSheet.create({
  errorText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "600",
  },
});

export default ErrorMessage;
