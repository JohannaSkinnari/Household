import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, useTheme } from "react-native-paper";

interface Props {
  icon?: string;
  title: string;
  onPress: () => void;
}
export default function CustomButton({ icon, title, onPress }: Props) {
  const { colors } = useTheme();
  return (
    <View style={{ elevation: 0 }}>
      <Button
        style={[styles.button]}
        mode="contained"
        color={colors.surface}
        icon={icon}
        onPress={onPress}
        uppercase={false}
      >
        {title}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderRadius: 20,
  },
});
