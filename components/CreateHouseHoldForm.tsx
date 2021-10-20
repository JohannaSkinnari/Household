import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import * as yup from "yup";
import { ICreateHouseHold, IHouseHold } from "../interfaces/IHouseHold";
import React from "react";
import { Formik } from "formik";
import { TextInput, View, StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper";
import AvatarList from "./AvatarList";
import CustomButton from "./common/CustomButton";
import { ICreateMember, IMember } from "../interfaces/IMember";
import { createHouseHold } from "../redux/houseHold/houseHoldThunk";
import { createMember } from "../redux/member/memberThunk";

type RootValidationSchema = Record<keyof FormData, yup.AnySchema>;
type HouseValidationSchema = Record<keyof FormData["house"], yup.AnySchema>;
type MemberValidationSchema = Record<keyof FormData["member"], yup.AnySchema>;

const validationSchema = yup.object().shape<RootValidationSchema>({
  house: yup.object().shape<HouseValidationSchema>({
    name: yup.string().required().min(3).max(25),
  }),
  member: yup.object().shape<MemberValidationSchema>({
    avatarId: yup.number().required(),
  }),
});

type FormData = {
  house: ICreateHouseHold;
  member: Omit<ICreateMember, "householdId">;
};

export default function CreateHouseHoldForm() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userList.user);

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

  const defaultFormData: FormData = {
    house: { name: "" },
    member: {
      avatarId: 1,
    },
  };

  function handleOnSubmit(values: FormData) {
    dispatch(createHouseHold(values));
  }

  return (
    <Formik
      initialValues={defaultFormData}
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
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
              placeholder={"hushållets namn"}
              onChangeText={handleChange("house.name")}
              onBlur={handleBlur("house.name")}
              value={values.house.name}
              clearTextOnFocus={true}
            />
            {errors.house?.name && touched.house?.name && (
              <Text style={styles.errors}>{errors.house.name}</Text>
            )}
          </View>
          <View style={{ marginHorizontal: 25, marginVertical: 30 }}>
            <AvatarList
              value={values.member.avatarId}
              onChange={(value) => setFieldValue("avatarId", parseFloat(value))}
            />
          </View>
          <View>
            <CustomButton
              icon={"plus-circle-outline"}
              title={"Spara"}
              onPress={handleSubmit}
            />
          </View>
        </View>
      )}
    </Formik>
  );
}
