import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View} from "react-native";
import { useTheme } from "@react-navigation/native";
import { RootStackScreenProps } from "../../navigation/RootNavigation";
import Firebase from "../../database/firebase";
import CustomButton from "../../components/common/CustomButton";
import { InputField, ErrorMessage } from "../../components";
import Logo from "../../components/Logo";

const auth = Firebase.auth();

export default function LoginScreen({
  navigation,
}: RootStackScreenProps<"Login">) {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [signupError, setSignupError] = useState("");

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
    try {
      if (email !== "" && userName !== "" && password !== "") {
        await auth.createUserWithEmailAndPassword(email, password);
        
        const user = Firebase.auth().currentUser;
        user.updateProfile({
          displayName: userName,
          photoURL: "https://alextrenoweth.co.uk/wp-content/uploads/2015/11/rowan-atkinson.jpg"
        }).then(() => {
          navigation.navigate("ProfileNav");
        })
      }
    } catch (error: unknown) {
      const er = error as Error;
      setSignupError(er.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <View style={[styles.authContainer, { backgroundColor: colors.card }]}>
        <Text style={styles.title}>Registrera nytt konto</Text>

        <InputField
          inputContainerStyle={{
            marginBottom: 20,
          }}
          leftIcon="email"
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          rightIcon={undefined}
          handlePasswordVisibility={undefined}
          autoCorrect={false}
        />

<InputField
          inputContainerStyle={{
            marginBottom: 20,
          }}
          leftIcon="account"
          placeholder="Användarnamn"
          autoCapitalize="none"
          keyboardType={""}
          textContentType="userName"
          autoFocus={false}
          value={userName}
          onChangeText={(text: string) => setUserName(text)}
          rightIcon={undefined}
          handlePasswordVisibility={undefined}
          autoCorrect={false}
        />

        <InputField
          inputContainerStyle={{
            marginBottom: 20,
          }}
          leftIcon="lock"
          placeholder="Lösenord"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType="password"
          rightIcon={rightIcon}
          value={password}
          onChangeText={(text: string) => setPassword(text)}
          handlePasswordVisibility={handlePasswordVisibility}
          keyboardType={""}
          autoFocus={false}
        />

        {signupError ? (
          <ErrorMessage error={signupError} visible={true} />
        ) : null}

        <View style={styles.buttonField}>
          <CustomButton onPress={onHandleSignup} title="Registrera" />
        </View>
        <View>
          <Text style={styles.footerText}>
            När du registrerar dig kommer du samtidigt att loggas in !
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 12,
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
    color: "#c75267",
    alignSelf: "center",
    paddingBottom: 24,
  },

  footerText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#c75267",
    alignSelf: "center",
    marginHorizontal: 15,
    marginVertical: 20,
  },

  buttonField: {
    padding: 5,
    marginTop: 4,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
  },

  logoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});
