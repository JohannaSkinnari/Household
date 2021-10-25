import React from "react";
import { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import { useTheme } from "@react-navigation/native";
import { RootStackScreenProps } from "../../navigation/RootNavigation";
import CustomButton from "../../components/common/CustomButton";
import { InputField, ErrorMessage } from "../../components";
import Logo from "../../components/Logo";
import { auth, firestore } from "../../database/firebase";
import { IUser } from "../../interfaces/IUser";



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
        const res = await auth.createUserWithEmailAndPassword(email, password);
        if((await res).user) {
          const userData: IUser = {
          email: email,
          name: userName,
          id: "1",
          password: password,
          
        };
        await firestore.collection('/users').doc(auth.currentUser?.uid).set(userData);
            auth.currentUser?.updateProfile({
          displayName: userName,
        })

          navigation.navigate("ProfileNav");
        }
      }
    } catch (error: unknown) {
      const er = error as Error;
      setSignupError(er.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={[styles.innerContainer, { backgroundColor: colors.background }]}>
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
          
          <CustomButton
              onPress={() => navigation.navigate("Login")}
              title="Logga in" />
        </View>
        
        <View>
          <Text style={styles.footerText}>
            När du registrerar dig kommer du samtidigt att loggas in !
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
    paddingHorizontal: 12,
    paddingTop: 50,
    justifyContent: 'space-around',
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
    justifyContent: "space-between",
  },

  logoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});
