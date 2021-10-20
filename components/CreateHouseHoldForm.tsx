import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import * as yup from "yup";
import { IHouseHold } from "../interfaces/IHouseHold";
import React from "react";
import { Formik } from "formik";
import { addHouseHold } from "../redux/houseHold/houseHoldSlice";
import { TextInput, View, StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper";
import AvatarList from "./AvatarList";
import CustomButton from "./common/CustomButton";
import { IMember } from "../interfaces/IMember";
import { IUser } from "../interfaces/IUser";

type houseValidationSchema = Record<
  keyof Omit<IHouseHold, "id" | "houseHoldCode">,
  yup.AnySchema
>;

type memberValidationSchema = Record<
  keyof Omit<IMember, "id" | "userId" | "householdId" | "isAdmin">,
  yup.AnySchema
>;

const householdValidation = yup.object().shape<houseValidationSchema>({
  name: yup.string().min(3).max(15).required("namn behövs..."),
});

const memberValidation = yup.object().shape<memberValidationSchema>({
  avatarId: yup.number().required(),
});

export default function CreateHouseHoldForm() {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    root: {
      justifyContent: "center",
      alignItems: "center",
    },
    errors: {
      fontSize: 14,
      color: colors.darkPink,
      fontWeight: "500",
      paddingHorizontal: 10,
    },
    inputText: {
      backgroundColor: colors.textInput,
      color: colors.onSurface,
      fontSize: 16,
      alignItems: "center",
      borderRadius: 8,
      height: 40,
      width: 200,
      paddingHorizontal: 16,
    },
  });

  interface FormData {
    house: Omit<IHouseHold, "id" | "houseHoldCode">;
    member: Omit<IMember, "id">;
    user: Omit<IUser, "name" | "email" | "password">;
  }

  const defaultFormData: FormData = {
    house: { name: "" },
    member: {
      userId: "vårtuserid",
      householdId: "house.id",
      isAdmin: true,
      avatarId: 0,
    },
    user: { id: "hämta in id" },
  };

  return (
    <Formik
      initialValues={defaultFormData}
      validationSchema={[householdValidation, memberValidation]}
      onSubmit={(values) => {
        //dispatch(addHouseHold(values));
      }}
    >
      {({
        setFieldValue,
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
        <View style={styles.root}>
          <View>
            <TextInput
              style={styles.inputText}
              placeholder="hushållets namn"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.house.name}
              clearTextOnFocus={true}
            />
            {errors.house?.name && touched.house?.name && (
              <Text style={styles.errors}>{errors.house.name}</Text>
            )}
          </View>
          <View style={{ marginHorizontal: 25, marginVertical: 30 }}>
            <AvatarList onChange={handleChange("avatarId")} />
          </View>
          <View>
            <CustomButton title={"Spara"} onPress={handleSubmit} />
          </View>
        </View>
      )}
    </Formik>
  );
}
