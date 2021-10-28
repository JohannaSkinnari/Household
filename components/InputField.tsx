import React, { FC } from "react";
import { StyleSheet, TextStyle, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

interface Props {
  placeholder: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  inputContainerStyle: TextStyle;
  leftIcon?: any;
  rightIcon?: any;
  // autoCapitalize: string;
  // keyboardType: string;
  // textContentType: string;
  // autoFocus: boolean;
  // value: any;
  handlePasswordVisibility?: any;
  // autoCorrect: boolean;
}

const InputField: FC<Props> = ({
  inputContainerStyle,
  leftIcon,
  placeholder,
  secureTextEntry,
  onChangeText,
  rightIcon,
  handlePasswordVisibility,
}: Props) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        inputContainerStyle,
        { backgroundColor: colors.background },
      ]}
    >
      {leftIcon ? (
        <MaterialCommunityIcons
          name={leftIcon}
          size={20}
          color={colors.placeholder}
          style={styles.leftIcon}
        />
      ) : null}
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry || false}
        onChangeText={onChangeText}
        placeholderTextColor={colors.placeholder}
      />
      {rightIcon ? (
        <TouchableOpacity onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons
            name={rightIcon}
            size={20}
            color={colors.placeholder}
            style={styles.rightIcon}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: "row",
    padding: 12,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOpacity: 0.8,
    elevation: 40,
    shadowOffset: { width: 3, height: 3 },
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    width: "100%",
    fontSize: 18,
  },

  rightIcon: {
    alignSelf: "center",
    marginLeft: 10,
  },
});
