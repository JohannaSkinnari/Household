import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";
import { ErrorMessage, InputField } from "../../components";
import CustomButton from "../../components/common/CustomButton";
import Logo from "../../components/Logo";
import { ISignUpData } from "../../interfaces/ISignupData";
import { RootStackScreenProps } from "../../navigation/RootNavigation";
import { useAppDispatch } from "../../redux/reduxHooks";
import { signupUser } from "../../redux/user/userThunk";

export default function SignupScreen({
  navigation,
}: RootStackScreenProps<"SignUp">) {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [signupError, setSignupError] = useState("");

  const dispatch = useAppDispatch();

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onHandleSignup = async () => {
    if (email !== "" && userName !== "" && password !== "") {
      const newUser: ISignUpData = {
        email,
        password,
        name: userName,
      };
      await dispatch(signupUser(newUser));
      navigation.navigate("Intro");
    } else {
      setSignupError("Fyll i alla fält");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[styles.innerContainer, { backgroundColor: colors.surface }]}
        >
          <View style={styles.logoContainer}>
            <Logo />
          </View>

          <View
            style={[
              styles.authContainer,
              { backgroundColor: colors.background },
            ]}
          >
            <Text style={[styles.title, { color: colors.darkPink }]}>
              Registrera nytt konto
            </Text>

            <InputField
              inputContainerStyle={{
                marginBottom: 20,
              }}
              leftIcon="email"
              placeholder="Email"
              onChangeText={(text: string) => setEmail(text)}
              rightIcon={undefined}
              handlePasswordVisibility={undefined}
            />

            <InputField
              inputContainerStyle={{
                marginBottom: 20,
              }}
              leftIcon="account"
              placeholder="Användarnamn"
              onChangeText={(text: string) => setUserName(text)}
              rightIcon={undefined}
              handlePasswordVisibility={undefined}
            />

            <InputField
              inputContainerStyle={{
                marginBottom: 20,
              }}
              leftIcon="lock"
              placeholder="Lösenord"
              secureTextEntry={passwordVisibility}
              rightIcon={rightIcon}
              onChangeText={(text: string) => setPassword(text)}
              handlePasswordVisibility={handlePasswordVisibility}
            />

            {signupError ? <ErrorMessage error={signupError} visible /> : null}

            <View style={styles.buttonField}>
              <CustomButton
                onPress={() => navigation.navigate("Login")}
                title="Logga in"
              />
              <CustomButton onPress={onHandleSignup} title="Registrera" />
            </View>

            <View>
              <Text style={[styles.footerText, { color: colors.darkPink }]}>
                Efter att du har registrerar dig kommer du till en kort intro,
                välj om du vill skippa den i nästa skärm !
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  innerContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 50,
    paddingBottom: 30,
    justifyContent: "space-around",
  },

  authContainer: {
    marginHorizontal: 18,
    paddingHorizontal: 12,

    borderRadius: 10,
    paddingVertical: 40,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOpacity: 0.9,
    elevation: 40,
    shadowOffset: { width: 3, height: 3 },
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    alignSelf: "center",
    paddingBottom: 24,
  },

  footerText: {
    fontSize: 12,
    fontWeight: "600",
    alignSelf: "center",
    marginHorizontal: 15,
    marginVertical: 20,
  },

  buttonField: {
    padding: 5,
    marginTop: 4,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },

  logoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});
