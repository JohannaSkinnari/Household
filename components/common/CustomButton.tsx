import { Button, useTheme } from "react-native-paper";
import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  icon?: string,
  title: string,
  onPress: () => void;
}
export default function CustomButton({icon, title, onPress}: Props) {
  const { colors } = useTheme();
  return (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <Button
        style={[styles.button]}
        mode="contained"
        color={colors.surface}
        icon={icon}
        onPress={onPress}
      >
      {title}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderRadius: 20,
  }
})